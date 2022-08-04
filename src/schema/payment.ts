import { z } from "zod";
import { courseIdSchema } from "./course";

export const paymentIdSchema = z.string();

export const paymentCreateSchema = z.object({
  courseId: courseIdSchema,
  amount: z.string().nullable(),
  image: z.string(),
});

export type paymentCreateType = z.infer<typeof paymentCreateSchema>;

export const paymentUpdateSchema = z.object({
  id: paymentIdSchema,
  approvedUserId: z.string(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export type paymentUpdateType = z.infer<typeof paymentUpdateSchema>;
