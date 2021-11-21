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
import TasksSection from "./TasksSection";
import AppSection from "./AppSection";

interface ExecDashboardProps extends UserPageProps {}

const ExecDashboard: React.FC<ExecDashboardProps> = ({ user }) => {
    return (
        <Flex backgroundColor="bg">
            <Sidebar />
            <Flex height="665px" justifyContent="space-evenly">
                <AppSection user={user} />
                <TasksSection />
            </Flex>
        </Flex>
    );
};

export default ExecDashboard;
