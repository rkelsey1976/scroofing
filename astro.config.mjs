// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { lastmodForUrl } from './src/utils/sitemapLastmod.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://scroofing.co.uk',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thank-you'),
      serialize(item) {
        item.lastmod = lastmodForUrl(item.url);
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});