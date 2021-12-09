import { Points } from ".prisma/client";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useRedeemedPointsQuery } from "../../../generated/graphql";

interface ReedembedByProps {
  link: Points;
}

const ReedembedBy: React.FC<ReedembedByProps> = ({ link }) => {
  const { data } = useRedeemedPointsQuery({
    variables: { id: link.id },
    pollInterval: 5000,
  });

  const reversed = data?.redeemedPoints.slice().reverse();

  return (
    <Box p="2rem">
      <Heading>Redeemed By</Heading>
      <Stack mt="2rem">
        {reversed &&
          reversed.map((user) => (
            <>
              <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                  <Image
                    src={user.image}
                    width="3rem"
                    mr="1rem"
                    borderRadius="50%"
                  />
                  <Text>{user.name}</Text>
                </Flex>
                <Text fontSize="2rem" fontWeight="bold">
                  +{link.value}
                </Text>
              </Flex>
              <Divider color="secondary" />
            </>
          ))}
      </Stack>
    </Box>
  );
};

export default ReedembedBy;
