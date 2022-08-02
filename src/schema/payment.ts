import { z } from "zod";
import { courseIdSchema } from "./course";

export const paymentIdSchema = z.string();

export const paymentCreateSchema = z.object({
  courseId: courseIdSchema,
  amount: z.number(),
  image: z.string(),
});

export const paymentUpdateSchema = z.object({
  id: paymentIdSchema,
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});
