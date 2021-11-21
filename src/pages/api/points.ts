import { NextApiRequest, NextApiResponse } from "next";
import { randomBytes } from "crypto";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

type PostBody = {
  value: number;
  name: string;
};

const prisma = new PrismaClient();

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { value, name }: PostBody = req.body;
  const code = randomBytes(3).toString("hex");

  const link = await prisma.points.create({
    data: {
      name,
      value,
      linkCode: code,
    },
  });

  return res.status(200).json(link);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") return await postHandler(req, res);
};

export default handler;
