import { PointsType } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return await getHandler(req, res);
};

export default handler;
