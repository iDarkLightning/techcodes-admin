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

interface AppSectionProps extends UserPageProps {}
interface AppSquareProps {
  color: string;
  children: any;
  wide?: boolean;
  href?: string;
}

const AppSquare: React.FC<AppSquareProps> = ({
  color,
  children,
  wide = false,
  href,
}) => {
  return (
    <Link href={href}>
      <GridItem colSpan={wide ? 2 : 1}>
        <Flex
          width="100%"
          height="17vw"
          borderRadius="30px"
          background={`gradient.${color}`}
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
        >
          <Image src={"/graph.svg"} alt={"random"} height="50%" />
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
      </GridItem>
    </Link>
  );
};

const AppSection: React.FC<AppSectionProps> = ({ user }) => {
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
            Good Morning, {fname}
          </Text>
          <Text
            fontWeight="400"
            color="accent.900"
            fontSize="1rem"
            lineHeight="2rem"
          >
            Apps
          </Text>
        </Flex>
        <Box overflow="hidden" width="5vw" height="40px" borderRadius="20px">
          <Image src={user.image} alt="You" width="100%" />
        </Box>
      </Flex>

      <Grid
        templateColumns="repeat(2, minmax(0, 1fr))"
        gap={10}
        height="fit-content"
        width="100%"
      >
        <AppSquare color="red" href="/points-manager">
          Points Tracker
        </AppSquare>
        <AppSquare color="purple">Dato CMS</AppSquare>
        <AppSquare color="yellow">Attendance Link</AppSquare>
        <AppSquare color="green">Email Maker</AppSquare>
      </Grid>
    </Flex>
  );
};

export default AppSection;
