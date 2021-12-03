import { Button, Center, Heading, Stack } from "@chakra-ui/react";
import { Points, Role, User } from "@prisma/client";
import { signIn } from "next-auth/react";
import React from "react";
import { ExecPointsPage } from "../../apps/points-manager/views/exec-redeem";
import { StudentPointsPage } from "../../apps/points-manager/views/student-redeem";
import { withUser } from "../../helpers/withUser";
import { prisma } from "../../lib/prisma";

interface RedeemPointsProps {
  user: User;
  redirect: boolean;
  error?: string;
  value?: number;
  link?: Points;
}

const BG_URL =
  "https://i2.wp.com/files.123freevectors.com/wp-content/original/160922-green-and-white-texture-background.jpg?w=800&q=95";

const RedeemPoints: React.FC<RedeemPointsProps> = ({
  user,
  error,
  value,
  link,
  redirect,
}) => {
  if (redirect) {
    return (
      <Center
        height="100vh"
        as={Stack}
        spacing={10}
        background={`url(${BG_URL}) no-repeat center center`}
        backgroundSize="cover"
      >
        <Heading fontWeight="500">Please Sign In First!</Heading>
        <Button
          onClick={() =>
            signIn("google", { callbackUrl: `/points/${link.linkCode}` })
          }
          backgroundColor="accent.900"
          color="white"
          fontWeight="400"
          _hover={{ backgroundColor: "accent.900", opacity: "80%" }}
        >
          Sign In
        </Button>
      </Center>
    );
  }

  switch (user.role) {
    case Role.EXEC:
      return <ExecPointsPage link={link} />;
    case Role.MEMBER:
      return <StudentPointsPage link={link} error={error} value={value} />;
  }
};

// Mutating the DB in getServerSideProps might be bad practice, should look into it
export const getServerSideProps = withUser(async ({ user, context }) => {
  const { code } = context.params;

  const pointLink = await prisma.points.findUnique({
    where: { linkCode: code! as string },
  });

  if (!user)
    return {
      props: { redirect: true, link: pointLink },
    };

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
      data: {
        points: user.points + pointLink.value,
        redeemedPoints: [...user.redeemedPoints, pointLink.id],
      },
    });

    return { props: { user, error: null, value: pointLink.value } };
  } else {
    return { props: { user, link: pointLink } };
  }
});

export default RedeemPoints;
