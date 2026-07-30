# GBP URL — placeholder, please replace

## Why this file exists

We added 3 references to your Google Business Profile (GBP) URL using
the placeholder `GBP_REVIEW_URL`. Before these changes can actually
work for SEO (showing star ratings in Google search results), the
placeholder needs to be replaced with your real GBP URL.

## Files that contain `GBP_REVIEW_URL`

- `src/layouts/Layout.astro` — schema `sameAs` array (1 occurrence)
- `src/pages/index.astro` — Google badge `<a>` link + 2 CTAs (3 occurrences)

You can find them all with:

  grep -rn "GBP_REVIEW_URL" src/

## What to use

Any of these URL formats work:

- `https://g.page/r/...`         (Google's modern short format — best)
- `https://www.google.com/maps/place/...` (full Google Maps URL)
- `https://maps.app.goo.gl/...`  (Google short link)
- `https://www.google.com/maps/search/?api=1&query=SC+Roofing+Bath` (search fallback — works without a verified GBP)

## How to find your GBP URL

1. Go to https://business.google.com/ in your browser
2. Sign in with the Google account that owns the S C Roofing GBP
3. Click on S C Roofing in the business list
4. Copy the URL from the address bar
5. Find-and-replace `GBP_REVIEW_URL` with that URL across the 2 files
6. Commit + push to deploy

## What this fixes

Google shows star ratings in search results based on data from a
verified Google Business Profile — NOT from `aggregateRating` schema
on the page. The schema rating we have already (5 stars, 3 reviews)
is largely ignored by Google for SERP stars.

The fix is bidirectional signalling:
- GBP lists the website URL → tells Google "this is our site"
- Site links to the GBP → tells Google "this GBP is ours"

Once both directions exist, and the schema review count matches the
GBP review count, Google typically starts showing stars within 2-4 weeks.

## Sanity check

After replacing the placeholder, verify:
- Schema on homepage has the GBP URL in sameAs
- Clicking the Google badge / "Read all reviews" link goes to the GBP
- GBP review count still matches schema's `ratingCount` (currently 3)

If you have a different number of reviews on the GBP than 3, update:
  src/layouts/Layout.astro
  → aggregateRating.ratingCount
to match.