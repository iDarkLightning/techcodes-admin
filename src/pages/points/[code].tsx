import { Points, Role, User } from "@prisma/client";
import React from "react";
import { ExecPointsPage } from "../../apps/points-manger/views/exec-redeem";
import { StudentPointsPage } from "../../apps/points-manger/views/student-redeem";
import { withUser } from "../../helpers/withUser";
import { prisma } from "../../lib/prisma";

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
      return <StudentPointsPage link={link} error={error} value={value} />;
  }
};

// Mutating the DB in getServerSideProps might be bad practice, should look into it
export const getServerSideProps = withUser(async ({ user, context }) => {
  if (!user) return { redirect: { destination: "/", permanent: false } };

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
