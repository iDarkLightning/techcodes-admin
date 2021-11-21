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
import AppSection from "./AppSection";
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
            width="90%"
            borderRadius="10px"
            alignItems="center"
            justifyContent="space-between"
            border="1px solid rgba(32, 29, 29, 0.37)"
            padding="25px 15px"
        >
            <Flex flexDirection="column" alignItems="flex-start">
                <Text
                    fontWeight="600"
                    color="accent.900"
                    fontSize={{ base: "0.9rem", lg: "1.4rem" }}
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
                    fontSize={{ base: "1rem", lg: "2rem" }}
                    textAlign="right"
                    color="accent.900"
                >
                    +{points}
                </Text>
            ) : (
                <Text
                    fontWeight="500"
                    fontSize={{ base: "0.6rem", lg: "1rem" }}
                    textAlign="right"
                    lineHeight="40px"
                    borderRadius="20px"
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

const TasksSection: React.FC<TaskSectionProps> = ({ student }) => {
    return (
        <Flex
            background="rgba(255, 255, 255, 0.8)"
            width="35vw"
            height="100%"
            filter="drop-shadow(2px 4px 1px rgba(0, 0, 0, 0.25))"
            borderRadius="30px"
            padding="35px"
            flexDirection="column"
            justifyContent="space-evenly"
        >
            <Text
                color="accent.900"
                fontSize={{ base: "0.9rem", lg: "1.6rem" }}
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
                    fontSize={{ base: "0.6rem", lg: "1rem" }}
                    textAlign="center"
                    lineHeight="40px"
                    borderRadius="10px"
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

export default TasksSection;