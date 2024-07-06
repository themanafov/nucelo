import * as z from "zod";

export const authFormSchema = z.object({
  email: z.string().email(),
});
