import { z } from 'zod';

export const lessonIdSchema = z.string();

export const lessonCreateSchema = z.object({
  title: z.string(),
  courseId: z.string(),
});

export type lessonCreateType = z.infer<typeof lessonCreateSchema>;

export const lessonSchema = z.object({
  id: lessonIdSchema,
});

export type lessonUpdateType = z.infer<typeof lessonSchema>;
