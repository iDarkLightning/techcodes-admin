import { PointsType, Role } from "@prisma/client";
import { randomBytes } from "crypto";
import { NextApiResponse, NextApiRequest } from "next";
import { isAuth } from "../../../lib/exec-auth";
import { prisma } from "../../../lib/prisma";

type PostBody = {
  name: string;
  value: number;
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

export const pointsHandler = isAuth(
  [Role.EXEC],
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") return await getHandler(res);
    if (req.method === "POST") return await postHandler(req, res);
    if (req.method === "PATCH") return await patchHandler(req, res);
  }
);
