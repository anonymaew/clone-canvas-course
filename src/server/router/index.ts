// src/server/router/index.ts
import { createUnprotectedRouter } from "./unprotect-router";
import superjson from "superjson";

import { profileRouter } from "./subrouter/profile";
import { paymentRouter } from "./subrouter/payment";
import { courseRouter } from "./subrouter/course";
import { lessonRouter } from "./subrouter/lesson";

export const appRouter = createUnprotectedRouter()
  .transformer(superjson)
  .merge("profile.", profileRouter)
  .merge("payment.", paymentRouter)
  .merge("course.", courseRouter)
  .merge("lesson.", lessonRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
