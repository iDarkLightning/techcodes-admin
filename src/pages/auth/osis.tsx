import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { withUser } from "../../helpers/withUser";
import { UserPageProps } from "../../types/UserProp";

const Osis: React.FC<UserPageProps> = ({ user }) => {
  const [osis, setOsis] = useState("");
  const router = useRouter();

  const submit = () => {
    axios
      .post("/api/auth/update-osis", {
        email: user.email,
        osis,
      })
      .then(() => router.push("/dashboard"));
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

export const getServerSideProps = withUser(async ({ user }) => {
  if (!user.osis) return { props: { user: user } };
  return { redirect: { destination: "/dashboard", permanent: false } };
});

export default Osis;
