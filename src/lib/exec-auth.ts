import { Role } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "./prisma";

export const isAuth = (
  roles: Role[],
  handler: (req: NextApiRequest, res: NextApiResponse) => any
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const user = await prisma.user.findFirst({
      where: { email: session?.user.email },
    });

    if (!roles.includes(user.role))
      return res.status(401).json({ message: "Unauthorized" });

    return handler(req, res);
  };
};
