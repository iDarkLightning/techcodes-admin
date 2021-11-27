import { Points } from ".prisma/client";
import { Image, Center, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { UserPageProps } from "../../types/UserProp";

interface StudentPointsPageProps extends UserPageProps {
  link: Points;
  error: string;
  value: number;
}

const StudentPointsPage: React.FC<StudentPointsPageProps> = ({
  error,
  value,
}) => {
  return (
    <Center height="100vh">
      {error && (
        <Stack>
          <Image src="/cross.svg" />
          <Heading>{error}</Heading>
        </Stack>
      )}
      {value && (
        <Stack>
          <Image src="/check.svg" />
          <Heading>Reedemed for {value} points!</Heading>
        </Stack>
      )}
    </Center>
  );
};

export default StudentPointsPage;
