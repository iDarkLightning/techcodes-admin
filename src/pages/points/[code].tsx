import { Box, Button, Flex, Heading, Stack, Image } from "@chakra-ui/react";
import { Points, PrismaClient, Role, User } from "@prisma/client";
import React from "react";
import { withUser } from "../../helpers/withUser";
import { prisma } from "../../lib/prisma";
import ExecPointsPage from "../../components/points/ExecPointsPage";
import { Sidebar } from "../../components/Sidebar";
import StudentPointsPage from "../../components/points/StudentPointsPage";

interface RedeemPointsProps {
  user: User;
  error?: string;
  value?: number;
  link?: Points;
}

const RedeemPoints: React.FC<RedeemPointsProps> = ({
  user,
  error,
  value,
  link,
}) => {
  switch (user.role) {
    case Role.EXEC:
      return <ExecPointsPage link={link} />;
    case Role.MEMBER:
      return (
        <StudentPointsPage
          user={user}
          link={link}
          error={error}
          value={value}
        />
      );
  }
};

export const getServerSideProps = withUser(async ({ user, context }) => {
  const { code } = context.params;

  const pointLink = await prisma.points.findUnique({
    where: { linkCode: code! as string },
  });

  if (user.role === Role.MEMBER) {
    if (!pointLink || !user)
      return { redirect: { destination: "/", permanent: false } };

    if (!pointLink.enabled)
      return {
        props: {
          user,
          error: "This link has been disabled",
          value: null,
        },
      };

    if (user.redeemedPoints.includes(pointLink.id)) {
      return {
        props: {
          user,
          error: "You have already reedemed this link!",
          value: null,
        },
      };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { redeemedPoints: [...user.redeemedPoints, pointLink.id] },
    });

    return { props: { user, error: null, value: pointLink.value } };
  } else {
    return { props: { user, link: pointLink } };
  }
});

export default RedeemPoints;
