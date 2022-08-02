import { createRouter } from "../context";
import {
  lessonIdSchema,
  lessonCreateSchema,
  lessonSchema,
} from "../../../schema/lesson";
import { courseIdSchema } from "../../../schema/course";

const lessonCreateRouter = createRouter().mutation("", {
  input: lessonCreateSchema,
  async resolve({ ctx, input }) {
    await ctx.prisma.lesson.create({
      data: {
        ...input,
      },
    });
  },
});

const lessonReadRouter = createRouter()
  .query("one", {
    input: lessonIdSchema,
    async resolve({ ctx, input }) {
      const id = input;
      return await ctx.prisma.lesson.findFirst({
        where: {
          id,
        },
      });
    },
  })
  .query("in-course", {
    input: courseIdSchema,
    async resolve({ ctx, input }) {
      const courseId = input;
      return await ctx.prisma.lesson.findMany({
        where: {
          courseId,
        },
      });
    },
  });

const lessonUpdateRouter = createRouter().mutation("", {
  input: lessonSchema,
  async resolve({ ctx, input }) {
    await ctx.prisma.lesson.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
      },
    });
  },
});

const lessonDeleteRouter = createRouter().mutation("", {
  input: lessonIdSchema,
  async resolve({ ctx, input }) {
    await ctx.prisma.lesson.delete({
      where: {
        id: input,
      },
    });
  },
});

export const lessonRouter = createRouter()
  .merge("create", lessonCreateRouter)
  .merge("read.", lessonReadRouter)
  .merge("update", lessonUpdateRouter)
  .merge("delete", lessonDeleteRouter);
