import { z } from "zod";

export const lessonIdSchema = z.string();

export const lessonCreateSchema = z.object({
  title: z.string(),
  courseId: z.string(),
});

export const lessonSchema = z.object({
  id: lessonIdSchema,
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
});