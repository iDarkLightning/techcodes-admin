import {
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Text,
  Grid,
  GridItem,
  Image,
  useBreakpointValue,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { EditIcon } from "@chakra-ui/icons";
import { UserPageProps } from "../../types/UserProp";
import EditPoints from "./EditPoints";

const UserPointRow: React.FC<UserPageProps> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submit = async (value) => {
    if (parseInt(value) === user.points) return;

    await axios.post("/api/points/manual", {
      userId: user.id,
      value: parseInt(value),
    });
  };
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
          <Text width="80%" isTruncated>
            {user.name}
          </Text>
        </GridItem>
        {!mobileGrid && <GridItem alignSelf="center">{user.email}</GridItem>}
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
