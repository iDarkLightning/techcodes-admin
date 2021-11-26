import { Role } from ".prisma/client";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import AppStatsSection from "../components/AppStatsSection";
import { Sidebar } from "../components/Sidebar";
import { withUser } from "../helpers/withUser";
import { UserPageProps } from "../types/UserProp";

const Dashboard: React.FC<UserPageProps> = ({ user }) => {
  return (
    <Flex flexDirection={{ base: "column", md: "row" }}>
      <Sidebar />
      <Box
        overflow="auto"
        width="100%"
        height="100%"
        m="auto 0"
        css={{
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            background: "#7a7a7a",
            borderRadius: "25px",
          },
        }}
      >
        <Flex
          height={{ base: "85vh", md: "90vh" }}
          m={{ base: "2rem auto 0 auto", md: "auto" }}
          flexDirection={{ base: "column", md: "row" }}
          width="80%"
          justifyContent="space-between"
        >
          <Box width="100%">
            <AppStatsSection user={user} student={user.role === Role.MEMBER} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export const getServerSideProps = withUser(({ user }) => {
  if (!user) return { redirect: { destination: "/", permanent: false } };
  return { props: { user } };
});

export default Dashboard;
