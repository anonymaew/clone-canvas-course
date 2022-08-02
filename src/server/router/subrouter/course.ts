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
  .query("one", {
    input: courseIdSchema,
    async resolve({ ctx, input }) {
      const id = input;

      return await ctx.prisma.course.findFirst({
        where: {
          OR: [
            {
              id,
              teachers: { some: { id: ctx.session.user.id } },
            },
            {
              id,
              students: { some: { id: ctx.session.user.id } },
              published: true,
            },
          ],
        },
      });
    },
  })
  .query("many", {
    async resolve({ ctx }) {
      return await ctx.prisma.course.findMany({
        where: {
          OR: [
            { teachers: { some: { id: ctx.session.user.id } } },
            {
              students: { some: { id: ctx.session.user.id } },
              published: true,
            },
          ],
        },
      });
    },
  });

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
  .merge("create", courseCreateRouter)
  .merge("read.", courseReadRouter)
  .merge("update", courseUpdateContentRouter)
  .merge("delete", courseDeleteRouter);
