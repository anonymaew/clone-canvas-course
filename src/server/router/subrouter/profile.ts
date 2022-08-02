import { createRouter } from "../context";
import * as trpc from "@trpc/server";
import superjson from "superjson";
import { profileIdSchema, userSchema } from "../../../schema/profile";

// creating user is already handled by next-auth

const profileReadRouter = createRouter()
  .query("one", {
    input: profileIdSchema,
    async resolve({ ctx, input }) {
      const id = input;
      return await ctx.prisma.user.findFirst({
        where: {
          id,
        },
      });
    },
  })
  .query("many", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  });

const profileUpdateRouter = createRouter().mutation("", {
  input: userSchema,
  async resolve({ ctx, input }) {
    await ctx.prisma.user.update({
      where: {
        id: input.id,
      },
      data: { ...input },
    });
  },
});

const profileDeleteRouter = createRouter().mutation("", {
  input: profileIdSchema,
  async resolve({ ctx, input }) {
    await ctx.prisma.user.delete({
      where: {
        id: input,
      },
    });
  },
});

export const profileRouter = createRouter()
  .transformer(superjson)
  .merge("read.", profileReadRouter)
  .merge("update", profileUpdateRouter)
  .merge("delete", profileDeleteRouter);
