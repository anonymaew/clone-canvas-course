import { z } from 'zod';

import { blogSchema } from '../../../schema/blog';
import { courseIdSchema } from '../../../schema/course';
import { lessonCreateSchema, lessonIdSchema, lessonSchema } from '../../../schema/lesson';
import { createRouter } from '../context';

const lessonCreateRouter = createRouter().mutation("", {
  input: lessonCreateSchema,
  async resolve({ ctx, input }) {
    await ctx.prisma.lesson.create({
      data: {
        course: { connect: { id: input.courseId } },
        blogHeader: {
          create: {
            title: input.title,
            blogContent: {
              create: {},
            },
          },
        },
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
          OR: [
            {
              course: {
                students: { some: { studentId: ctx.session.user.id } },
                published: true,
              },
            },
            {
              course: {
                teachers: { some: { teacherId: ctx.session.user.id } },
              },
            },
          ],
        },
        include: { blogHeader: { include: { blogContent: true } } },
      });
    },
  })
  .query("in-course", {
    input: courseIdSchema,
    async resolve({ ctx, input }) {
      const id = input;
      return await ctx.prisma.lesson.findMany({
        where: {
          courseId: id,
          OR: [
            {
              course: {
                students: { some: { studentId: ctx.session.user.id } },
                published: true,
              },
            },
            {
              course: {
                teachers: { some: { teacherId: ctx.session.user.id } },
              },
            },
          ],
        },
        include: { blogHeader: true },
      });
    },
  });

const lessonUpdateRouter = createRouter().mutation("", {
  input: z.object({
    lesson: lessonSchema,
    blog: blogSchema,
  }),
  async resolve({ ctx, input }) {
    await ctx.prisma.lesson.update({
      where: {
        id: input.lesson.id,
      },
      data: {
        ...input.lesson,
        blogHeader: {
          update: {
            title: input.blog.title,
            blogContent: {
              update: {
                content: input.blog.content,
              },
            },
          },
        },
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
