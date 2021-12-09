import { EditIcon } from "@chakra-ui/icons";
import {
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { UsersReturnFragment } from "../../../generated/graphql";
import EditPoints from "./EditPoints";

const UserPointRow: React.FC<{ user: UsersReturnFragment }> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mobileGrid = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Grid
        templateColumns={mobileGrid ? "1fr 1fr 1fr" : "1fr 1fr 1fr 1fr 1fr"}
        padding="1rem"
      >
        {!mobileGrid && (
          <GridItem>
            <Image
              alignSelf="center"
              src={user.image}
              h="3rem"
              w="3rem"
              borderRadius="50%"
            />
          </GridItem>
        )}
        <GridItem alignSelf="center">
          <Text width="80%" isTruncated>
            {user.osis}
          </Text>
        </GridItem>
        <GridItem alignSelf="center">
          <Text width="10vmax" textAlign="left" isTruncated>
            {user.name}
          </Text>
        </GridItem>
        {!mobileGrid && (
          <GridItem alignSelf="center">
            <Text width="18vmax" textAlign="left" isTruncated>
              {user.email}
            </Text>
          </GridItem>
        )}
        <GridItem alignSelf="center">
          <Flex alignItems="center" width="100%" justifyContent="space-between">
            <Text>{user.points}</Text>
            <IconButton
              color="white"
              aria-label="edit points"
              bgColor="accent.900"
              icon={<EditIcon />}
              onClick={onOpen}
            />
          </Flex>
          <EditPoints isOpen={isOpen} onClose={onClose} userId={user.id} />
        </GridItem>
      </Grid>
      <Divider color="secondary" />
    </>
  );
};

export default UserPointRow;
