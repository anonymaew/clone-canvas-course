import * as trpc from "@trpc/server";
import { createUnprotectedRouter } from "./unprotect-router";

/**
 * Creates a tRPC router that asserts all queries and mutations are from an authorized user. Will throw an unauthorized error if a user is not signed in.
 */
export function createRouter() {
  return createUnprotectedRouter().middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user || !ctx.session.user.id) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        // infers that `session` is non-nullable to downstream resolvers
        session: {
          ...ctx.session,
          user: {
            ...ctx.session.user,
            id: ctx.session.user.id,
          },
        },
      },
    });
  });
}
