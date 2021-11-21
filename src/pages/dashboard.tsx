import { Role } from ".prisma/client";
import {
    Box,
    Center,
    Flex,
    Grid,
    GridItem,
    Heading,
    Icon,
    Stack,
    Text,
    Image,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import { withUser } from "../helpers/withUser";
import { UserPageProps } from "../types/UserProp";
import { Sidebar } from "../components/Sidebar";
import TasksHistorySection from "../components/TasksHistorySection";
import AppStatsSection from "../components/AppStatsSection";

const Dashboard: React.FC<UserPageProps> = ({ user }) => {
    return (
        <Flex backgroundColor="bg">
            <Sidebar />
            <Flex
                height={{ base: "fit-content", md: "85vh" }}
                width="100%"
                justifyContent="space-evenly"
                margin={{ base: "calc(10vh + 4rem) 0 5vh", md: "10vh 0 5vh" }}
                flexDirection={{ base: "column", md: "row" }}
                alignItems="center"
            >
                <AppStatsSection
                    user={user}
                    student={user.role === Role.MEMBER}
                />
                <TasksHistorySection student={user.role === Role.MEMBER} />
            </Flex>
        </Flex>
    );
};

export const getServerSideProps = withUser(({ user }) => {
    console.log(user);
    if (!user) return { redirect: { destination: "/", permanent: false } };
    return { props: { user } };
});

export default Dashboard;
