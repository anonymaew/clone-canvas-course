import { createRouter } from "../context";
import * as trpc from "@trpc/server";
import superjson from "superjson";
import {
  paymentCreateSchema,
  paymentIdSchema,
  paymentUpdateSchema,
} from "../../../schema/payment";

const paymentCreateRouter = createRouter().mutation("", {
  input: paymentCreateSchema,
  async resolve({ ctx, input }) {
    await ctx.prisma.payment.create({
      data: {
        ...input,
        userId: ctx.session.user.id,
      },
    });
  },
});

const paymentReadRouter = createRouter()
  .query("mine", {
    input: paymentIdSchema,
    async resolve({ ctx, input }) {
      return await ctx.prisma.payment.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
    },
  })
  .query("many", {
    async resolve({ ctx }) {
      return await ctx.prisma.payment.findMany();
    },
  });

const paymentUpdateRouter = createRouter().mutation("", {
  input: paymentUpdateSchema,
  async resolve({ ctx, input }) {
    await ctx.prisma.payment.update({
      where: {
        id: input.id,
      },
      data: {
        status: input.status,
        approvedUserId: ctx.session.user.id,
      },
    });
  },
});

const paymentDeleteRouter = createRouter().mutation("", {
  input: paymentIdSchema,
  async resolve({ ctx, input }) {
    const id = input;

    await ctx.prisma.payment.delete({
      where: {
        id,
      },
    });
  },
});

export const paymentRouter = createRouter()
  .transformer(superjson)
  .merge("create", paymentCreateRouter)
  .merge("read.", paymentReadRouter)
  .merge("update", paymentUpdateRouter)
  .merge("delete", paymentDeleteRouter);
