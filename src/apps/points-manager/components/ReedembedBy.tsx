import { Points, User } from ".prisma/client";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Image,
  Text,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import useSWR from "swr";

interface ReedembedByProps {
  link: Points;
}

const ReedembedBy: React.FC<ReedembedByProps> = ({ link }) => {
  const { data } = useSWR(
    `/api/points/redeemed/${link.id}`,
    async (url) => {
      const res = await axios.get<User[]>(url);
      return res.data;
    },
    { refreshInterval: 5000 } // for idiots, this is 5s (im gonna forget later)
  );

  useEffect(() => console.log(data), []);

  return (
    <Box p="2rem">
      <Heading>Redeemed By</Heading>
      <Stack mt="2rem">
        {data &&
          data.map((user) => (
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
