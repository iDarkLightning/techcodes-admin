import { Points } from ".prisma/client";
import { Image, Center, Heading, Stack, Flex } from "@chakra-ui/react";
import React from "react";
import { Sidebar } from "../../../components/Sidebar";

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
    <Flex flexDirection={{ base: "column", md: "row" }}>
      <Sidebar />
      <Center height="100vh" width="100%">
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
    </Flex>
  );
};
