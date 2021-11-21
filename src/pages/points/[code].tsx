import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { Points, PrismaClient, Role, User } from "@prisma/client";
import React from "react";
import { withUser } from "../../helpers/withUser";
import QRCode from "qrcode.react";

interface RedeemPointsProps {
  user: User;
  error?: string;
  value?: number;
  link?: Points;
}

const prisma = new PrismaClient();

const RedeemPoints: React.FC<RedeemPointsProps> = ({
  user,
  error,
  value,
  link,
}) => {
  switch (user.role) {
    case Role.EXEC:
      return (
        <Stack
          display="flex"
          width="100vw"
          h="100vh"
          justifyContent="center"
          alignItems="center"
          bgColor="bg"
          flexDirection="column"
        >
          <QRCode value={`http://localhost:3000/${link.linkCode}`} size={256} />
          <Heading color="accent.900" fontWeight="500" fontSize="2rem">
            {link.name[0].toUpperCase() +
              link.name.substring(1, link.name.length)}{" "}
            - {link.value} Points
          </Heading>
          <Button>Disable</Button>
        </Stack>
      );
    case Role.MEMBER:
      return <p>Student</p>;
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

    if (user.redeemedPoints.includes(pointLink.id)) {
      return { props: { user, error: "already redeemed", value: null } };
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
