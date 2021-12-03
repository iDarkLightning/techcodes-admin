import {
    useDisclosure,
    useBreakpointValue,
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import { Role, PointsType, User, Points } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import CreateEmail from "../components/CreateEmail";
import EmailRow from "../components/EmailRow";
import SearchUser from "../components/SearchUser";
import { Sidebar } from "../../../components/Sidebar";
import UserPointRow from "../components/UserPointRow";

export const EmailsView: React.FC = () => {
    const { data: userData } = useSWR("/api/users", async (url) => {
        const res = await axios.get<User[]>(url);
        return res.data;
    });
    const { data: linkData } = useSWR("/api/points", async (url) => {
        const res = await axios.get<Points[]>(url);
        return res.data;
    });
    const [tabIndex, setTabIndex] = useState(0);
    const [searchParam, setSearchParam] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const mobileGrid = useBreakpointValue({ base: true, md: false });

    return (
        <Flex flexDirection={{ base: "column", md: "row" }}>
            <Sidebar />
            <Flex
                height={{ base: "85vh", md: "90vh" }}
                m={{ base: "2rem auto 0 auto", md: "auto" }}
                flexDirection="column"
                width="90%"
            >
                <Flex justifyContent="space-between">
                    <Heading fontWeight="500">Email Craftamatron</Heading>
                    <Button
                        bgColor="accent.900"
                        color="#F6F6F6"
                        fontWeight="400"
                        p="0.5rem 0.8rem"
                        borderRadius="1.2rem"
                        onClick={onOpen}
                    >
                        Craftamatron an email
                    </Button>
                </Flex>

                <Box
                    width="100%"
                    mt="2rem"
                    bgColor="#F6F6F6"
                    h="70vh"
                    overflow="auto"
                >
                    <Text
                        padding="1rem"
                        fontWeight="bold"
                        textDecoration="underline"
                    >
                        Name
                    </Text>
                    <Divider scolor="secondary" />
                    {linkData &&
                        linkData
                            .filter((link) => link.type === PointsType.LINK)
                            .map((link) => <EmailRow point={link} />)}
                    <CreateEmail isOpen={isOpen} onClose={onClose} />
                </Box>
            </Flex>
        </Flex>
    );
};
