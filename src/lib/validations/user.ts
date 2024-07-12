import * as z from "zod";
import { validUsernameRegex } from "../constants";

const notAllowedUsernames = ["app", "go"];

export const updateUserSchema = z.object({
  name: z.string().min(1).max(48).optional(),
  username: z
    .string()
    .toLowerCase()
    .regex(validUsernameRegex, "You can only use letters and numbers")
    .min(1)
    .max(36)
    .refine(
      (value) => !notAllowedUsernames.includes(value as string),
      `You can't use this username`,
    )
    .optional(),
  title: z.string().max(32).nullable().optional(),
  about: z.string().max(400).nullable().optional(),
  image: z.string().url().nullable().optional(),
  email: z.string().email().optional(),
  seoTitle: z.string().max(60).nullable().optional(),
  seoDescription: z.string().max(160).nullable().optional(),
  ogImage: z.string().url().nullable().optional(),
  twitter: z.string().trim().nullable().optional(),
  postscv: z.string().trim().nullable().optional(),
  dribbble: z.string().trim().nullable().optional(),
  github: z.string().trim().nullable().optional(),
  linkedin: z.string().trim().nullable().optional(),
  readcv: z.string().trim().nullable().optional(),
  contactEmail: z.string().trim().nullable().optional(),
});
