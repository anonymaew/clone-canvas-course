import z from "zod";

export const profileIdSchema = z.string();

export const userSchema = z.object({
  id: profileIdSchema,
  name: z.string(),
  content: z.string(),
});
