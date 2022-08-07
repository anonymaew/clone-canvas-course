import superjson from 'superjson';

import { checkRouter } from './subrouter/check';
import { courseRouter } from './subrouter/course';
import { lessonRouter } from './subrouter/lesson';
import { paymentRouter } from './subrouter/payment';
import { profileRouter } from './subrouter/profile';
import { createUnprotectedRouter } from './unprotect-router';

export const appRouter = createUnprotectedRouter()
  .transformer(superjson)
  .merge("profile.", profileRouter)
  .merge("payment.", paymentRouter)
  .merge("course.", courseRouter)
  .merge("lesson.", lessonRouter)
  .merge("check.", checkRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
