import { Points } from ".prisma/client";
import { Image, Center, Heading, Stack } from "@chakra-ui/react";
import React from "react";

interface StudentPointsPageProps {
  link: Points;
  error: string;
  value: number;
}

export const StudentPointsPage: React.FC<StudentPointsPageProps> = ({
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
