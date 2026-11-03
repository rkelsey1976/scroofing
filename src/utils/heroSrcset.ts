// Responsive sources for full-width hero photos. The -480w/-960w webp
// variants sit beside the original in public/images; widths are the
// originals' after optimisation (Nov 2026). Add a row when a new hero is used.
const HERO_WIDTHS: Record<string, number> = {
  '/images/roof-bristol.webp': 1360,
  '/images/unnamed (1).webp': 1360,
  '/images/unnamed.webp': 1020,
  '/images/486603524_9803734869658733_1301359858312601123_n.jpg': 1440,
  '/images/69305585_2639619822736976_1040299988862631936_n.jpg': 960,
  '/images/unnamed (9).webp': 765,
  '/images/guttering.jpg': 1600,
};

export function heroSrcset(src: string): string | undefined {
  const full = HERO_WIDTHS[src];
  if (!full) return undefined;
  const base = src.replace(/\.[^.]+$/, '');
  const enc = (s: string) => s.replace(/ /g, '%20');
  return [480, 960]
    .filter((w) => w < full)
    .map((w) => `${enc(`${base}-${w}w.webp`)} ${w}w`)
    .concat(`${enc(src)} ${full}w`)
    .join(', ');
}
