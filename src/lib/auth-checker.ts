import { getSession } from "next-auth/react";
import { AuthChecker } from "type-graphql";
import { Context } from "../types/Context";
import { prisma } from "./prisma";

export const authChecker: AuthChecker<Context> = async ({ context }, roles) => {
  const session = await getSession({ req: context.req });
  if (!session) return false;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!roles.includes(user.role)) return false;

  return true;
};
