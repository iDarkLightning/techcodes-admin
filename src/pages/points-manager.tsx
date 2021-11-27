import { Points, PointsType, Role, User } from ".prisma/client";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "../components/Sidebar";
import { withUser } from "../helpers/withUser";
import useSWR from "swr";
import UserPointRow from "../components/points/UserPointRow";
import SearchUser from "../components/points/SearchUser";
import PointLinkRow from "../components/points/PointLinkRow";
import CreatePoints from "../components/points/CreatePoints";

const fetchUsers = async (url) => {
  const res = await axios.get<User[]>(url);
  return res.data;
};

const fetchPoints = async (url) => {
  const res = await axios.get<Points[]>(url);
  return res.data;
};

const Points: React.FC<{ links: Points[] }> = () => {
  const { data: userData } = useSWR("/api/users", fetchUsers);
  const { data: linkData } = useSWR("/api/points", fetchPoints);
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
        <Heading fontWeight="500">Points Manager</Heading>
        <Tabs
          mt="2rem"
          isLazy
          variant="soft-rounded"
          colorScheme="green"
          onChange={(index) => setTabIndex(index)}
        >
          <Flex width="100%" flexDirection="row" justifyContent="space-between">
            <TabList>
              <Tab color="black">Points</Tab>
              <Tab>Links</Tab>
            </TabList>
            <Flex>
              {tabIndex == 0 ? (
                <SearchUser setSearchParam={setSearchParam} />
              ) : (
                <Button bgColor="secondary" borderRadius="0" onClick={onOpen}>
                  Create a Link
                </Button>
              )}
            </Flex>
          </Flex>
          <Box
            width="100%"
            mt="2rem"
            bgColor="#F6F6F6"
            h="70vh"
            overflow="auto"
          >
            <TabPanels>
              <TabPanel>
                <Grid
                  templateColumns={
                    mobileGrid ? "1fr 1fr 1fr" : "1fr 1fr 1fr 1fr 1fr"
                  }
                  padding="1rem"
                  fontWeight="bold"
                >
                  {!mobileGrid && <GridItem>Avatar</GridItem>}
                  <GridItem>OSIS</GridItem>
                  <GridItem>Name</GridItem>
                  {!mobileGrid && <GridItem>Email Address</GridItem>}
                  <GridItem>Points</GridItem>
                </Grid>
                <Divider color="secondary" />
                {userData &&
                  userData
                    .filter((user) => user.role !== Role.EXEC)
                    .filter((user) =>
                      user.name.toLowerCase().includes(searchParam)
                    )
                    .map((user) => <UserPointRow user={user} />)}
              </TabPanel>
              <TabPanel>
                <Grid
                  templateColumns={
                    mobileGrid ? "1fr 1fr 1fr" : "1fr 1fr 1fr 1fr 1fr"
                  }
                  padding="1rem"
                  fontWeight="bold"
                >
                  <GridItem>Name</GridItem>
                  <GridItem>Value</GridItem>
                  {!mobileGrid && <GridItem>Code</GridItem>}
                  {!mobileGrid && <GridItem>Status</GridItem>}
                  <GridItem>View More</GridItem>
                </Grid>
                <Divider scolor="secondary" />
                {linkData &&
                  linkData
                    .filter((link) => link.type === PointsType.LINK)
                    .map((link) => <PointLinkRow point={link} />)}
              </TabPanel>
              <CreatePoints isOpen={isOpen} onClose={onClose} />
            </TabPanels>
          </Box>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export const getServerSideProps = withUser(async ({ user }) => {
  if (!user) return { redirect: { destination: "/", permanent: false } };
  if (user.role !== Role.EXEC)
    return { redirect: { destination: "/dashboard", permanent: false } };

  return { props: {} };
  // const links = await prisma.points.findMany();

  // return { props: { user, links } };
});

export default Points;
