import { PointsType } from ".prisma/client";
import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { isAuth } from "../../../lib/exec-auth";
import { prisma } from "../../../lib/prisma";

type PostBody = {
  userId: string;
  name: string;
  value: number;
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { value, userId, name }: PostBody = req.body;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  const points = await prisma.points.create({
    data: {
      type: PointsType.MANUAL,
      name,
      value,
    },
  });

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      redeemedPoints: [...user.redeemedPoints, points.id],
      points: user.points + value,
    },
  });

  return res.status(200).json(updatedUser);
};

export const manualPostHandler = isAuth(
  [Role.EXEC],
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") return await postHandler(req, res);
  }
);
