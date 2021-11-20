import { PrismaClient, Role } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type Body = { email: string; osis: string };
type Query = {
  where: { email: string };
  data: { osis: string; role: Role };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(400);

  const { email, osis }: Body = req.body;

  const query: Query = {
    where: { email },
    data: { osis, role: Role.MEMBER },
  };

  if (email.includes("techcodes")) {
    query.data.role = Role.EXEC;
  }

  const user = await prisma.user.update(query);
  return res.status(200).json(user);
};

export default handler;
