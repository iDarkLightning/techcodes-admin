import { PointsType } from ".prisma/client";
import { randomBytes } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

type PostBody = {
  value: number;
  name: string;
};

type PatchBody = {
  id: string;
  value: boolean;
};

const getHandler = async (res: NextApiResponse) => {
  return res.json(await prisma.points.findMany());
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { value, name }: PostBody = req.body;
  const code = randomBytes(3).toString("hex");

  const link = await prisma.points.create({
    data: {
      type: PointsType.LINK,
      name,
      value,
      linkCode: code,
    },
  });

  return res.status(200).json(link);
};

const patchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, value }: PatchBody = req.body;

  const updated = await prisma.points.update({
    where: {
      id,
    },
    data: {
      enabled: value,
    },
  });

  return res.status(200).json(updated);
};

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return await getHandler(res);
  if (req.method === "POST") return await postHandler(req, res);
  if (req.method === "PATCH") return await patchHandler(req, res);
};

export default handler;
