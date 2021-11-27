import {
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Grid,
  GridItem,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { UserPageProps } from "../../types/UserProp";

const UserPointRow: React.FC<UserPageProps> = ({ user }) => {
  const submit = async (value) => {
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
        <GridItem alignSelf="center">{user.osis}</GridItem>
        <GridItem alignSelf="center">{user.name}</GridItem>
        {!mobileGrid && <GridItem alignSelf="center">{user.email}</GridItem>}
        <GridItem alignSelf="center">
          <Editable defaultValue={user.points.toString()} onSubmit={submit}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </GridItem>
      </Grid>
      <Divider color="secondary" />
    </>
  );
};

export default UserPointRow;
