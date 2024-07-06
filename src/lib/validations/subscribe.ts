import * as z from "zod";

export const subscribeSchema = z.object({
  name: z.string().min(1).max(48),
  email: z.string().email(),
});
