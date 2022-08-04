import superjson from "superjson";
import { createRouter } from "../context";
import {
  courseIdSchema,
  courseCreateSchema,
  courseSchema,
} from "../../../schema/course";

const courseCreateRouter = createRouter().mutation("", {
  input: courseCreateSchema,
  async resolve({ ctx, input }) {
    const course = await ctx.prisma.course.create({
      data: {
        ...input,
      },
    });
    await ctx.prisma.teacherEnrollment.create({
      data: {
        teacherId: ctx.session.user.id,
        courseId: course.id,
      },
    });
  },
});

const courseReadRouter = createRouter()
  .merge(
    "study.",
    createRouter()
      .query("one", {
        input: courseIdSchema,
        async resolve({ ctx, input }) {
          const id = input;
          return await ctx.prisma.course.findFirst({
            where: {
              id,
              published: true,
            },
            include: {
              students: {
                select: {
                  studentId: true,
                },
              },
            },
          });
        },
      })
      .query("enroll", {
        async resolve({ ctx }) {
          return await ctx.prisma.course.findMany({
            where: {
              students: { some: { id: ctx.session.user.id } },
              published: true,
            },
          });
        },
      })
      .query("many", {
        async resolve({ ctx }) {
          return await ctx.prisma.course.findMany({
            where: {
              published: true,
            },
          });
        },
      })
  )
  .merge(
    "teach.",
    createRouter()
      .query("one", {
        input: courseIdSchema,
        async resolve({ ctx, input }) {
          const id = input;
          return await ctx.prisma.course.findFirst({
            where: {
              id,
              teachers: { some: { teacherId: ctx.session.user.id } },
            },
          });
        },
      })
      .query("many", {
        async resolve({ ctx }) {
          return await ctx.prisma.course.findMany({
            where: {
              teachers: { some: { teacherId: ctx.session.user.id } },
            },
          });
        },
      })
  );

const courseUpdateContentRouter = createRouter().mutation("", {
  input: courseSchema,
  async resolve({ ctx, input }) {
    await ctx.prisma.course.update({
      where: { id: input.id },
      data: { ...input },
    });
  },
});

const courseDeleteRouter = createRouter().mutation("", {
  input: courseIdSchema,
  async resolve({ ctx, input }) {
    await ctx.prisma.course.delete({
      where: { id: input },
    });
  },
});

export const courseRouter = createRouter()
  .transformer(superjson)
  .merge("create", courseCreateRouter)
  .merge("read.", courseReadRouter)
  .merge("update", courseUpdateContentRouter)
  .merge("delete", courseDeleteRouter);
