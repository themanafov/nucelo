import * as z from "zod";

export const projectCreateSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  year: z
    .number()
    .min(2000)
    .max(new Date().getFullYear() + 20),
  description: z.string().min(10).max(30),
});

export const projectPatchSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1).max(70).optional(),
  content: z.string().optional(),
  year: z
    .number()
    .min(2000)
    .max(new Date().getFullYear() + 20)
    .optional(),
  description: z.string().max(60).optional(),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
  url: z.string().url().optional(),
  ogImage: z.string().url().nullable().optional(),
  published: z.boolean().optional(),
  password: z.string().optional(),
});
