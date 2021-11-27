import { PrismaClient } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.json(await prisma.user.findMany());
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "GET") return await getHandler(req, res);
};

export default handler;
