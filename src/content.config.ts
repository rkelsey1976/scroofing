import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    service: z.enum(['roof-repairs', 'new-roofs', 'flat-roofs', 'chimney-repairs', 'leadwork', 'guttering-fascias', 'general']).default('general'),
    author: z.string().default('S.C Roofing Ltd'),
    readingTime: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };