import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { UserPageProps } from "../types/UserProp";
import { Sidebar } from "./Sidebar";
import { BsBarChartLine } from "react-icons/bs";

interface ExecDashboardProps extends UserPageProps {}

const ExecDashboard: React.FC<ExecDashboardProps> = ({ user }) => {
  return (
    <Flex>
      <Sidebar />
    </Flex>
  );
};

export default ExecDashboard;
