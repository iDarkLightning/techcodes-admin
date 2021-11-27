import { PointsType } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

type PostBody = {
  userId: string;
  value: number;
};

const postHandler = async (
  session: Session,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { value, userId }: PostBody = req.body;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  const points = await prisma.points.create({
    data: {
      type: PointsType.MANUAL,
      name: `Manual change by ${session.user.name}`,
      value: value - user.points,
    },
  });

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      redeemedPoints: [...user.redeemedPoints, points.id],
      points: value,
    },
  });

  return res.status(200).json(updatedUser);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "POST") return await postHandler(session, req, res);
};

export default handler;
