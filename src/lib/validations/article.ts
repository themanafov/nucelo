import * as z from "zod";

export const articleCreateSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
});

export const articlePatchSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1).max(70).optional(),
  content: z.string().optional(),
  seoTitle: z.string().max(60).nullable().optional(),
  seoDescription: z.string().max(160).nullable().optional(),
  ogImage: z.string().url().nullable().optional(),
  published: z.boolean().optional(),
  publishedAt: z.string().date().optional(),
  canonicalURL: z.string().url().nullable().optional(),
});
