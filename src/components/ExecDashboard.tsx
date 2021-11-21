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
import React from "react";
import { UserPageProps } from "../types/UserProp";
import { Sidebar } from "./Sidebar";
import TasksHistorySection from "./TasksHistorySection";
import AppStatsSection from "./AppStatsSection";

interface ExecDashboardProps extends UserPageProps {}

const ExecDashboard: React.FC<ExecDashboardProps> = ({ user }) => {
    return (
        <Flex backgroundColor="bg">
            <Sidebar />
            <Flex
                height="85vh"
                width="100%"
                justifyContent="space-evenly"
                margin="10vh 0 5vh"
            >
                <AppStatsSection user={user} />
                <TasksHistorySection />
            </Flex>
        </Flex>
    );
};

export default ExecDashboard;
