import { PrismaClient, Role } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { isAuth } from "../../../lib/exec-auth";
import { prisma } from "../../../lib/prisma";

type Body = { osis: string };
type Query = {
  where: { email: string };
  data: { osis: string; role: Role };
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { osis }: Body = req.body;
  const session = await getSession();

  const query: Query = {
    where: { email: session.user.email },
    data: { osis, role: Role.MEMBER },
  };

  if (session.user.email.includes("@techcodes.org")) {
    query.data.role = Role.EXEC;
  }

  const user = await prisma.user.update(query);
  return res.status(200).json(user);
};

const handler = isAuth(
  [Role.EXEC, Role.MEMBER],
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return await postHandler(req, res);
  }
);

export default handler;
