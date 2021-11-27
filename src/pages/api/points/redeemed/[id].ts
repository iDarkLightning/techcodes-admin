import { Role } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { isAuth } from "../../../../lib/exec-auth";
import { prisma } from "../../../../lib/prisma";

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.json(
    await prisma.user.findMany({
      where: {
        redeemedPoints: {
          has: req.query.id as string,
        },
      },
      select: {
        image: true,
        name: true,
      },
    })
  );
};

const handler = isAuth(
  [Role.EXEC],
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") return await getHandler(req, res);
  }
);

export default handler;
