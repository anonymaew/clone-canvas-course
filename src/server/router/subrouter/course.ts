import superjson from 'superjson';
import { z } from 'zod';

import { blogSchema } from '../../../schema/blog';
import { courseCreateSchema, courseIdSchema, courseSchema } from '../../../schema/course';
import { createRouter } from '../context';

const courseCreateRouter = createRouter().mutation("", {
  input: courseCreateSchema,
  async resolve({ ctx, input }) {
    await ctx.prisma.teacherEnrollment.create({
      data: {
        teacher: { connect: { id: ctx.session.user.id } },
        course: {
          create: {
            blogHeader: {
              create: {
                ...input,
                blogContent: {
                  create: {},
                },
              },
            },
          },
        },
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
            include: { blogHeader: { include: { blogContent: true } } },
          });
        },
      })
      .query("enroll", {
        async resolve({ ctx }) {
          return await ctx.prisma.course.findMany({
            where: {
              students: { some: { studentId: ctx.session.user.id } },
              published: true,
            },
            include: { blogHeader: true },
          });
        },
      })
      .query("many", {
        async resolve({ ctx }) {
          return await ctx.prisma.course.findMany({
            where: {
              published: true,
            },
            include: { blogHeader: true },
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
            include: { blogHeader: { include: { blogContent: true } } },
          });
        },
      })
      .query("many", {
        async resolve({ ctx }) {
          return await ctx.prisma.course.findMany({
            where: {
              teachers: { some: { teacherId: ctx.session.user.id } },
            },
            include: { blogHeader: true },
          });
        },
      })
  );

const courseUpdateContentRouter = createRouter().mutation("", {
  input: z.object({
    course: courseSchema,
    blog: blogSchema,
  }),
  async resolve({ ctx, input }) {
    await ctx.prisma.course.update({
      where: { id: input.course.id },
      data: {
        ...input.course,
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
