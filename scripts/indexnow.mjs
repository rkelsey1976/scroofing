#!/usr/bin/env node
/**
 * IndexNow submission — pings Bing (and other IndexNow engines) with the
 * URLs that have changed since the last run, so new/edited pages are
 * crawled within hours instead of waiting for Bingbot's slow organic
 * crawl.
 *
 * Modes:
 *   - No args: diff against .indexnow-state.json, submit only new URLs.
 *     First run (no state file) submits every URL in the sitemap.
 *   - With args: explicit URL list (back-compat, no state update).
 *     node scripts/indexnow.mjs /areas/bath /services/roof-repairs
 *   - --all: bypass the diff, submit every URL in the sitemap (e.g.
 *     after a big migration). Updates the state file.
 *
 * The key file (public/<key>.txt) must be live on the site before this works.
 * IndexNow submissions do NOT count against Bing Webmaster Tools' manual
 * URL-submission quota.
 */

const HOST = 'scroofing.co.uk';
const KEY = '911f2fc714397b3b3ba366ec8fb6186b';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const STATE_FILE = new URL('../.indexnow-state.json', import.meta.url);

async function getAllSitemapUrls() {
  // This site's sitemap is two-level: sitemap-index.xml points at one or
  // more sitemap-N.xml shards, so follow the index rather than assuming
  // a single flat sitemap.xml.
  const indexRes = await fetch(`https://${HOST}/sitemap-index.xml`);
  if (!indexRes.ok) throw new Error(`Sitemap index fetch failed: HTTP ${indexRes.status}`);
  const indexXml = await indexRes.text();
  const shardUrls = [...indexXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  if (shardUrls.length === 0) throw new Error('No <loc> entries found in sitemap-index.xml');

  const urls = [];
  for (const shardUrl of shardUrls) {
    const res = await fetch(shardUrl);
    if (!res.ok) throw new Error(`Sitemap shard fetch failed (${shardUrl}): HTTP ${res.status}`);
    const xml = await res.text();
    urls.push(...[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim()));
  }
  if (urls.length === 0) throw new Error('No <loc> entries found in any sitemap shard');
  return urls;
}

async function readState() {
  try {
    const raw = await fs.readFile(STATE_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.urls)) return parsed.urls;
    return [];
  } catch {
    return [];
  }
}

async function writeState(urls) {
  const payload = JSON.stringify(
    { urls, lastRun: new Date().toISOString() },
    null,
    2
  ) + '\n';
  await fs.writeFile(STATE_FILE, payload, 'utf8');
}

function diffUrls(current, previous) {
  const previousSet = new Set(previous);
  return current.filter((u) => !previousSet.has(u));
}

async function getUrls(args) {
  // Explicit URL list — bypass state diff entirely, do not update state.
  if (args.length > 0 && !args.includes('--all')) {
    return {
      urls: args.map((p) => (p.startsWith('http') ? p : `https://${HOST}${p.startsWith('/') ? p : `/${p}`}`)),
      updateState: false,
    };
  }

  const current = await getAllSitemapUrls();
  const previous = await readState();

  if (args.includes('--all')) {
    // Force full submission (e.g. after a content audit or migration).
    return { urls: current, updateState: true };
  }

  // Default: diff against last submission, submit only new URLs.
  const newUrls = diffUrls(current, previous);
  return { urls: newUrls, updateState: true };
}

async function submit(urls) {
  if (urls.length === 0) {
    console.log('No new URLs to submit — sitemap is unchanged since last run.');
    return 202; // treat as a no-op success
  }

  // IndexNow has a per-batch cap of 10,000 URLs. We're well under that
  // but defensive: chunk if needed.
  const BATCH = 10000;
  let lastStatus = null;
  for (let i = 0; i < urls.length; i += BATCH) {
    const slice = urls.slice(i, i + BATCH);
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: slice,
      }),
    });
    console.log(`Batch ${i / BATCH + 1}: HTTP ${res.status} ${res.statusText} (${slice.length} URLs)`);
    const body = await res.text();
    if (body) console.log(body);
    lastStatus = res.status;
    if (res.status !== 200 && res.status !== 202) {
      throw new Error(`IndexNow returned HTTP ${res.status}`);
    }
  }
  return lastStatus;
}

import { promises as fs } from 'node:fs';

async function main() {
  // Verify the key file is live first — submissions with an unreachable key are ignored.
  const keyRes = await fetch(KEY_LOCATION);
  const keyBody = (await keyRes.text()).trim();
  if (!keyRes.ok || keyBody !== KEY) {
    throw new Error(`Key file not live yet at ${KEY_LOCATION} (HTTP ${keyRes.status}) — deploy first`);
  }

  const args = process.argv.slice(2);
  const { urls, updateState } = await getUrls(args);

  console.log(`Submitting ${urls.length} URLs for ${HOST}…`);

  const status = await submit(urls);

  if (updateState && urls.length > 0) {
    // After submission, save the FULL current sitemap as the new state.
    // (Not just what we submitted — we want the diff next time to be
    // based on what's live, not on what was submitted.)
    const fullCurrent = await getAllSitemapUrls();
    await writeState(fullCurrent);
    console.log(`Updated .indexnow-state.json with ${fullCurrent.length} URLs.`);
  }

  if (status !== 200 && status !== 202) process.exit(1);
  console.log('Done — Bing will crawl the submitted URLs shortly.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});