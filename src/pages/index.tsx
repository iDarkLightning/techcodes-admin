import { Button, Container } from "@chakra-ui/react";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Index = () => {
  const { data: session } = useSession();

  return (
    <Container>
      <Button
        onClick={() =>
          !session ? signIn("google", { callbackUrl: "/auth/osis" }) : signOut()
        }
      >
        {session ? "Sign Out" : "Sign In"}
      </Button>
    </Container>
  );
};

export default Index;
