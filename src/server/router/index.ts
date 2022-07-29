// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { profileRouter } from "./profile";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("profile.", profileRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
