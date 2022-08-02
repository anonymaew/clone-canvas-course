import { z } from "zod";

export const courseIdSchema = z.string();

export const courseCreateSchema = z.object({
  title: z.string(),
  courseId: courseIdSchema,
});

export const courseSchema = z.object({
  id: courseIdSchema,
  title: z.string(),
  published: z.boolean(),
  price: z.number(),
  content: z.string(),
});
