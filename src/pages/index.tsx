import { Button } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/Container";
import { signIn, signOut, useSession } from "next-auth/react";

const Index = () => {
  const { data: session } = useSession();

  return (
    <Container>
      <Button onClick={() => (!session ? signIn("google") : signOut())}>
        {session ? "Sign Out" : "Sign In"}
      </Button>
    </Container>
  );
};

export default Index;
