import superjson from 'superjson';

import { courseIdSchema } from '../../../schema/course';
import { paymentCreateSchema, paymentIdSchema, paymentUpdateSchema } from '../../../schema/payment';
import { createRouter } from '../context';

const isStudentEnrolledRouter = createRouter().query("", {
  input: courseIdSchema,
  async resolve({ ctx, input }) {
    return await ctx.prisma.studentEnrollment.findMany({
      where: {
        studentId: ctx.session.user.id,
        courseId: input,
      },
    });
  },
});

const isTeacherRouter = createRouter().query("", {
  async resolve({ ctx }) {
    return await ctx.prisma.user.findMany({
      where: {
        id: ctx.session.user.id,
        role: "TEACHER",
      },
    });
  },
});

const isTeacherEnrolledRouter = createRouter().query("", {
  input: courseIdSchema,
  async resolve({ ctx, input }) {
    return await ctx.prisma.teacherEnrollment.findMany({
      where: {
        teacherId: ctx.session.user.id,
        courseId: input,
      },
    });
  },
});

const isAdminRouter = createRouter().query("", {
  async resolve({ ctx }) {
    await ctx.prisma.user.findMany({
      where: {
        id: ctx.session.user.id,
        role: "ADMIN",
      },
    });
  },
});

export const checkRouter = createRouter()
  .transformer(superjson)
  .merge("study", isStudentEnrolledRouter)
  .merge("teach", isTeacherEnrolledRouter)
  .merge("teacher", isTeacherRouter)
  .merge("admin", isAdminRouter);
