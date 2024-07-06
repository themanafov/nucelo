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
  title: z.string().max(32).optional(),
  about: z.string().max(400).optional(),
  image: z.string().url().nullable().optional(),
  email: z.string().email().optional(),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
  ogImage: z.string().url().nullable().optional(),
  twitter: z.string().trim().optional(),
  postscv: z.string().trim().optional(),
  dribbble: z.string().trim().optional(),
  github: z.string().trim().optional(),
  linkedin: z.string().trim().optional(),
  readcv: z.string().trim().optional(),
  contactEmail: z.string().trim().optional(),
});
