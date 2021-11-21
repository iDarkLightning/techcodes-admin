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

interface AppSectionProps extends UserPageProps {
    student?: boolean;
}
interface AppSquareProps {
    color: string;
    children: any;
    wide?: boolean;
    to?: string;
}

const AppSquare: React.FC<AppSquareProps> = ({
    color,
    children,
    wide = false,
    to = "",
}) => {
    return (
        <GridItem colSpan={wide ? 2 : 1}>
            <Link href={to} isExternal _focus={{ outline: "0 !important" }}>
                <Flex
                    height="100%"
                    width="100%"
                    borderRadius="30px"
                    background={`gradient.${color}`}
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-around"
                >
                    <Image
                        src={"/graph.svg"}
                        alt={"random"}
                        height={{ base: "30%", lg: "50%" }}
                    />
                    <Text
                        fontWeight="600"
                        color="accent.900"
                        fontSize={{ base: "0.9rem", lg: "1.4rem" }}
                        textAlign="center"
                        width="90%"
                    >
                        {children}
                    </Text>
                </Flex>
            </Link>
        </GridItem>
    );
};

const AppStatsSection: React.FC<AppSectionProps> = ({ user, student }) => {
    const fname = user.name.split(" ")[0];
    const src = user.image;
    return (
        <Flex
            flexDirection="column"
            width="32vw"
            height="100%"
            justifyContent="space-between"
        >
            <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                height="10%"
                marginBottom="5%"
            >
                <Flex flexDirection="column">
                    <Text
                        fontWeight="500"
                        color="accent.900"
                        fontSize="1.4rem"
                        lineHeight="2rem"
                    >
                        Welcome, {fname}
                    </Text>
                    <Text
                        fontWeight="400"
                        color="accent.900"
                        fontSize="1rem"
                        lineHeight="2rem"
                    >
                        {student ? "Stats" : "Apps"}
                    </Text>
                </Flex>
                <Box
                    overflow="hidden"
                    width="5vw"
                    height="40px"
                    borderRadius="20px"
                >
                    <Image src={src} alt="You" width="100%" />
                </Box>
            </Flex>

            <Grid
                templateColumns="repeat(2, minmax(0, 1fr))"
                gap="40px"
                height="85%"
                width="100%"
            >
                <AppSquare color="red" wide={student}>
                    Points Tracker
                </AppSquare>
                <AppSquare
                    color={student ? "green" : "purple"}
                    to="https://admin.techcodes.org/editor"
                >
                    Dato CMS
                </AppSquare>
                <AppSquare color={student ? "purple" : "yellow"}>
                    Attendance
                </AppSquare>
                {!student && <AppSquare color="green">Email Maker</AppSquare>}
            </Grid>
        </Flex>
    );
};

export default AppStatsSection;
