import { User } from ".prisma/client";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../lib/prisma";

export const withUser = (
  gssp: (args: { user: User; context: GetServerSidePropsContext }) => any
) => {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);

    if (!session) return gssp({ user: null, context });

    const user = await prisma.user.findFirst({
      where: { email: session?.user.email },
    });

    return gssp({ user, context });
  };
};
