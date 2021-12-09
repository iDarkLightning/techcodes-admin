import { Flex, Stack, Box, Heading, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useRegisterMutation } from "../../../generated/graphql";
import { UserPageProps } from "../../../types/UserProp";

export const RegisterView: React.FC<UserPageProps> = ({ user }) => {
  const [osis, setOsis] = useState("");
  const [register] = useRegisterMutation();
  const router = useRouter();

  const submit = async () => {
    await register({ variables: { osis } });
    router.push((router.query.callback! as string) || "/dashboard");
  };

  return (
    <Flex width="100vw" height="100vh" alignItems="center">
      <Stack width="40vmax" margin="auto" color="accent.900" spacing={5}>
        <Box>
          <Heading as="h1">Welcome to TechCodes {user.name},</Heading>
          <Heading as="h2" fontSize="1.2rem" fontWeight="light">
            In order to finish the signup process, we need your OSIS number!
          </Heading>
        </Box>
        <Input
          variant="filled"
          placeholder="OSIS Number"
          onChange={(event) => setOsis(event.target.value)}
        />
        <Button
          bgColor="accent.900"
          color="bg"
          width="30%"
          _hover={{ bgColor: "accent.800" }}
          onClick={submit}
        >
          Sign Up
        </Button>
      </Stack>
    </Flex>
  );
};
