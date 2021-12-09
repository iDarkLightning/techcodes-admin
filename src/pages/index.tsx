import { Button, Container } from "@chakra-ui/react";
import React from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

const Index = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>TechCodes</title>
      </Head>
      <Container>
        <Button
          onClick={() =>
            !session
              ? signIn("google", { callbackUrl: "/auth/osis" })
              : signOut()
          }
        >
          {session ? "Sign Out" : "Sign In"}
        </Button>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session)
    return { redirect: { destination: "/dashboard", permanent: false } };

  return { props: {} };
};

export default Index;
