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
import HistorySection from "./HistorySection";
import StatsSection from "./StatsSection";

interface StudentDashboardProps extends UserPageProps {}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user }) => {
    return (
        <Flex backgroundColor="bg">
            <Sidebar />
            <Flex height="665px" justifyContent="space-evenly">
                <StatsSection user={user} />
                <HistorySection />
            </Flex>
        </Flex>
    );
};

export default StudentDashboard;
