import { z, defineCollection } from "astro:content"

// 2. Define a schema for each collection you'd like to validate.
const articleCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    nextLink: z.string(),
    video: z.string(),
  }),
})
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  "articles": articleCollection,
}
