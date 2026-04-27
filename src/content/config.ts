import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    author: z.string().default("LO Radar Team"),
    category: z.enum([
      "Industry Insights",
      "Product Deep Dives",
      "Compliance",
      "Loan Officer Playbooks",
    ]),
    keywords: z.array(z.string()),
    readingTime: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
