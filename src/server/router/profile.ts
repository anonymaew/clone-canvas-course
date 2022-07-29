import { createRouter } from "./context";
import { z } from "zod";

export const profileRouter = createRouter().query("all", {
  resolve({ ctx }) {
    return ctx.prisma.user.findMany();
  },
});
