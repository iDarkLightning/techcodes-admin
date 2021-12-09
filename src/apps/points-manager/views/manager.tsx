import {
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
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { PointsType, Role } from "@prisma/client";
import React, { useState } from "react";
import { Sidebar } from "../../../components/Sidebar";
import { usePointsQuery, useUsersQuery } from "../../../generated/graphql";
import { useFocusPoll } from "../../../shared-hooks/useFocusPoll";
import CreatePoints from "../components/CreatePoints";
import PointLinkRow from "../components/PointLinkRow";
import SearchUser from "../components/SearchUser";
import UserPointRow from "../components/UserPointRow";

export const PointsView: React.FC = () => {
  const { data: userData } = useUsersQuery();
  const {
    data: linkData,
    startPolling: pointsStartPolling,
    stopPolling: pointsStopPolling,
  } = usePointsQuery();
  const [tabIndex, setTabIndex] = useState(0);
  const [searchParam, setSearchParam] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const mobileGrid = useBreakpointValue({ base: true, md: false });
  useFocusPoll(pointsStartPolling, pointsStopPolling, 10 * 1000);

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
                  userData.users
                    .filter((user) => user.role !== Role.EXEC)
                    .filter((user) =>
                      user.name.toLowerCase().includes(searchParam)
                    )
                    .map((user) => <UserPointRow user={user} key={user.id} />)}
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
                  linkData.points
                    .filter((link) => link.type === PointsType.LINK)
                    .map((link) => <PointLinkRow point={link} key={link.id} />)}
              </TabPanel>
              <CreatePoints isOpen={isOpen} onClose={onClose} />
            </TabPanels>
          </Box>
        </Tabs>
      </Flex>
    </Flex>
  );
};
