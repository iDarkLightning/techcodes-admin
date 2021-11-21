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
    Link,
} from "@chakra-ui/react";
import React from "react";
import { UserPageProps } from "../types/UserProp";
import { Sidebar } from "./Sidebar";
import { BsBarChartLine } from "react-icons/bs";

interface TaskSectionProps {
    student?: boolean;
}
interface TaskSquareProps {
    title: string;
    date: string;
    student: boolean;
    board?: string;
    points?: number;
}

const TaskEventSquare: React.FC<TaskSquareProps> = ({
    title,
    date,
    student = false,
    board = "",
    points = -1,
}) => {
    return (
        <Flex
            width="100%"
            borderRadius="10px"
            alignItems="center"
            justifyContent="space-between"
            border="1px solid rgba(32, 29, 29, 0.37)"
            padding="25px 15px"
            margin="5px"
        >
            <Flex flexDirection="column" alignItems="flex-start">
                <Text
                    fontWeight="600"
                    color="accent.900"
                    fontSize={{ base: "0.9rem", md: "1rem", xl: "1.4rem" }}
                    textAlign="left"
                >
                    {title}
                </Text>
                <Text
                    fontWeight="500"
                    color="accent.700"
                    fontSize={{ base: "0.6rem", lg: "1rem" }}
                    textAlign="left"
                >
                    {date}
                </Text>
            </Flex>
            {student ? (
                <Text
                    fontWeight="bolder"
                    fontSize="1rem"
                    textAlign="right"
                    color="accent.900"
                >
                    +{points}
                </Text>
            ) : (
                <Text
                    fontWeight="500"
                    fontSize={{ base: "0.65rem", md: "0.7rem", xl: "0.8rem" }}
                    textAlign="right"
                    lineHeight="30px"
                    borderRadius="12px"
                    color="bg"
                    backgroundColor="accent.900"
                    padding="0px 12px"
                >
                    {board}
                </Text>
            )}
        </Flex>
    );
};

const TasksHistorySection: React.FC<TaskSectionProps> = ({ student }) => {
    return (
        <Flex
            background="rgba(255, 255, 255, 0.8)"
            marginTop={{ base: "10vh", md: "0" }}
            width={{ base: "90vw", md: "35vw" }}
            height={{ base: "550px", md: "100%" }}
            filter="drop-shadow(2px 4px 1px rgba(0, 0, 0, 0.25))"
            borderRadius="30px"
            padding="20px 48px"
            flexDirection="column"
            justifyContent="space-evenly"
        >
            <Text
                color="accent.900"
                fontSize={{ base: "1.2rem", xl: "1.6rem" }}
                textAlign="left"
                width="100%"
            >
                Your {student ? "point history" : "upcoming tasks"}
            </Text>
            <Flex
                flexDirection="column"
                alignItems="center"
                height="70%"
                justifyContent="space-between"
            >
                <TaskEventSquare
                    title="Admin Site"
                    date="June 9th, 1969"
                    student={student}
                    board="Programming"
                    points={100}
                />
                <TaskEventSquare
                    title="WTF is event #4"
                    date="June 9th, 1969"
                    student={student}
                    board="Events"
                    points={100}
                />
                <TaskEventSquare
                    title="Height Issue"
                    date="June 9th, 1969"
                    student={student}
                    board="Marketing"
                    points={100}
                />
            </Flex>
            <Link
                _focus={{ outline: "0 !important" }}
                width="fit-content"
                marginLeft="auto"
                marginRight="auto"
                href="https://trello.com/techcodes/home"
                isExternal
            >
                <Text
                    fontWeight="500"
                    fontSize={{ base: "0.8rem", lg: "1rem" }}
                    textAlign="center"
                    lineHeight="30px"
                    borderRadius="12px"
                    color="bg"
                    backgroundColor="accent.900"
                    padding="0px 8px"
                    width="fit-content"
                >
                    {student ? "Spreadsheet" : "Trello"}
                </Text>
            </Link>
        </Flex>
    );
};

export default TasksHistorySection;
