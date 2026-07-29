import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const dateCache = new Map();

function gitLastModified(relPath) {
  if (dateCache.has(relPath)) return dateCache.get(relPath);
  let date;
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: repoRoot,
      encoding: 'utf-8',
    }).trim();
    date = out ? new Date(out) : new Date();
  } catch {
    date = new Date();
  }
  dateCache.set(relPath, date);
  return date;
}

function maxDate(files) {
  return files.map(gitLastModified).reduce((a, b) => (b > a ? b : a));
}

const DATA_AREAS = 'src/data/areas.ts';
const DATA_SERVICES = 'src/data/services.ts';
const DATA_AREA_SERVICES = 'src/data/areaServices.ts';
const DATA_TESTIMONIALS = 'src/data/testimonials.ts';

// Maps a URL pathname to the source files whose git history determines
// that page's real last-modified date — the route template plus whichever
// data files feed it, since content for these pages is data-driven rather
// than hand-authored per file.
function routeFilesFor(pathname) {
  const parts = pathname.split('/').filter(Boolean);

  if (parts.length === 0) {
    return ['src/pages/index.astro', DATA_SERVICES, DATA_AREAS, DATA_TESTIMONIALS];
  }
  if (parts[0] === 'about') return ['src/pages/about.astro'];
  if (parts[0] === 'contact') return ['src/pages/contact.astro'];
  if (parts[0] === 'privacy-policy') return ['src/pages/privacy-policy.astro'];
  if (parts[0] === 'thank-you') return ['src/pages/thank-you.astro'];

  if (parts[0] === 'areas') {
    if (parts.length === 1) return ['src/pages/areas/index.astro', DATA_AREAS];
    if (parts.length === 2) return ['src/pages/areas/[slug].astro', DATA_AREAS, DATA_SERVICES];
    if (parts.length === 3) {
      return [
        'src/pages/areas/[area]/[service].astro',
        DATA_AREAS,
        DATA_SERVICES,
        DATA_AREA_SERVICES,
      ];
    }
  }

  if (parts[0] === 'services') {
    if (parts.length === 1) return ['src/pages/services/index.astro', DATA_SERVICES];
    if (parts.length === 2) return ['src/pages/services/[slug].astro', DATA_SERVICES, DATA_AREAS];
  }

  // Fallback for anything unmapped — safe default, shouldn't be hit in practice.
  return ['src/pages/index.astro'];
}

export function lastmodForUrl(url) {
  const pathname = new URL(url).pathname;
  return maxDate(routeFilesFor(pathname)).toISOString();
}
