import { Role } from ".prisma/client";
import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import AppStatsSection from "../components/AppStatsSection";
import { Sidebar } from "../components/Sidebar";
import { withUser } from "../helpers/withUser";
import { UserPageProps } from "../types/UserProp";

const Dashboard: React.FC<UserPageProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>TechCodes | Dashboard</title>
      </Head>
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Sidebar />
        <Box overflow="auto" width="100%" height="100%" m="auto 0">
          <Flex
            height={{ base: "85vh", md: "90vh" }}
            m={{ base: "2rem auto 0 auto", md: "auto" }}
            flexDirection={{ base: "column", md: "row" }}
            width="90%"
            justifyContent="space-between"
          >
            <Box width="100%">
              <AppStatsSection
                user={user}
                student={user.role === Role.MEMBER}
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export const getServerSideProps = withUser(({ user }) => {
  if (!user) return { redirect: { destination: "/", permanent: false } };
  return { props: { user } };
});

export default Dashboard;
