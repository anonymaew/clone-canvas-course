import { z } from 'zod';

export const blogIdSchema = z.string();

export const blogCreateSchema = z.object({
  title: z.string(),
});

export type blogCreateType = z.infer<typeof blogCreateSchema>;

export const blogSchema = z.object({
  id: blogIdSchema,
  title: z.string(),
  content: z.string(),
});

export type blogUpdateType = z.infer<typeof blogSchema>;
