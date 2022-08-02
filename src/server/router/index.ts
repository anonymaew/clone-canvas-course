// src/server/router/index.ts
import { createUnprotectedRouter } from "./unprotect-router";
import superjson from "superjson";

import { profileRouter } from "./subrouter/profile";

export const appRouter = createUnprotectedRouter()
  .transformer(superjson)
  .merge("profile.", profileRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
