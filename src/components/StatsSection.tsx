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
import { BsBarChartLine } from "react-icons/bs";

interface StatsSectionProps extends UserPageProps {}
interface StatsSquareProps {
    color: string;
    name: string;
    children: any;
    wide?: boolean;
}

const StatsSquare: React.FC<StatsSquareProps> = ({
    color,
    name,
    children,
    wide = false,
}) => {
    return (
        <GridItem colSpan={wide ? 2 : 1}>
            <Flex
                width="100%"
                height="17vw"
                borderRadius="30px"
                background={`gradient.${color}`}
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
                padding="15px"
            >
                <Text
                    fontWeight="bolder"
                    color="bg"
                    fontSize={
                        wide
                            ? { base: "2rem", lg: "3rem" }
                            : { base: "1rem", lg: "2rem" }
                    }
                    textAlign="left"
                    width="90%"
                    textTransform="uppercase"
                >
                    {name}
                </Text>
                <Text
                    fontWeight="bolder"
                    color="bg"
                    fontSize={{ base: "4rem", lg: "6rem" }}
                    textAlign="left"
                    width="90%"
                    textTransform="uppercase"
                >
                    {children}
                </Text>
            </Flex>
        </GridItem>
    );
};

const StatsSection: React.FC<StatsSectionProps> = ({ user }) => {
    const fname = user.name.split(" ")[0];
    const src = user.image;
    return (
        <Flex flexDirection="column" width="32vw" margin="10vh 5vw">
            <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                marginBottom="5vh"
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
                        Stats
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
                gap={10}
                height="fit-content"
                width="100%"
            >
                <StatsSquare color="red" wide name="points">
                    69,420
                </StatsSquare>
                <StatsSquare color="green" name="credits">
                    6
                </StatsSquare>
                <StatsSquare color="purple" name="present">
                    9
                </StatsSquare>
            </Grid>
        </Flex>
    );
};

export default StatsSection;
