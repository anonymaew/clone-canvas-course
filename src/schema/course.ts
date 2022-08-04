import { z } from "zod";

export const courseIdSchema = z.string();

export const courseCreateSchema = z.object({
  title: z.string(),
});

export type courseCreateType = z.infer<typeof courseCreateSchema>;

export const courseSchema = z.object({
  id: courseIdSchema,
  title: z.string(),
  published: z.boolean(),
  price: z.string().nullable(),
  content: z.string(),
});

export type courseUpdateType = z.infer<typeof courseSchema>;
