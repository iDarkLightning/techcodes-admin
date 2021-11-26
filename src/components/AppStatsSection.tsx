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
interface StatsSquareProps {
  color: string;
  name: string;
  children: any;
  wide?: boolean;
}

const AppSquare: React.FC<AppSquareProps> = ({
  color,
  children,
  wide = false,
  to = "",
}) => {
  return (
    <GridItem colSpan={wide ? 2 : { base: 2, md: 1 }}>
      <Link href={to} isExternal _focus={{ outline: "0 !important" }}>
        <Flex
          p="2em"
          height="100%"
          width="100%"
          borderRadius="30px"
          background={color}
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
        >
          <Image src={"/graph.svg"} alt={"random"} height="50%" />
          <Text
            fontWeight="bold"
            color="accent.900"
            fontSize="1.2rem"
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

const StatsSquare: React.FC<StatsSquareProps> = ({
  color,
  name,
  children,
  wide = false,
}) => {
  return (
    <GridItem colSpan={wide ? 2 : { base: 2, md: 1 }}>
      <Flex
        p="2em"
        height="100%"
        width="100%"
        borderRadius="30px"
        background={color}
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
      >
        <Text
          fontWeight="bolder"
          color="accent.900"
          fontSize={wide ? { base: "2rem", lg: "3rem" } : "2rem"}
          textAlign="left"
          width="90%"
          textTransform="uppercase"
        >
          {name}
        </Text>
        <Text
          fontWeight="bolder"
          color="accent.900"
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

const AppStatsSection: React.FC<AppSectionProps> = ({ user, student }) => {
  const fname = user.name.split(" ")[0];
  const src = user.image;
  return (
    <Flex
      flexDirection="column"
      height="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        marginBottom="5%"
      >
        <Flex flexDirection="column">
          <Text
            fontWeight="bold"
            color="accent.900"
            fontSize="2.3rem"
            lineHeight="2rem"
          >
            Welcome, {fname}
          </Text>
          <Text
            fontWeight="400"
            color="accent.900"
            fontSize="1rem"
            opacity="0.8"
            lineHeight="2rem"
          >
            {student ? "Stats" : "Apps"}
          </Text>
        </Flex>
        <Box width="3rem" height="100%" borderRadius="50%">
          <Image src={src} alt="You" width="100%" />
        </Box>
      </Flex>

      <Grid
        templateColumns="repeat(2, minmax(0, 1fr))"
        gap="20px"
        height="100%"
        width="100%"
      >
        {student ? (
          <>
            <StatsSquare color="#FFEFE2" wide name="points">
              4200
            </StatsSquare>
            <StatsSquare color="#EFFCEF" name="credits">
              6
            </StatsSquare>
            <StatsSquare color="#F4F6FA" name="present">
              9
            </StatsSquare>
          </>
        ) : (
          <>
            <AppSquare color="#FFEFE2" to="/points-manager">
              Points Tracker
            </AppSquare>
            <AppSquare color="#EFFCEF" to="https://admin.techcodes.org/editor">
              Dato CMS
            </AppSquare>
            <AppSquare color="#E6F5F9" to="https://trello.com/techcodes/home">
              Trello
            </AppSquare>
            <AppSquare color="#F4F6FA">Email Maker</AppSquare>
          </>
        )}
      </Grid>
    </Flex>
  );
};

export default AppStatsSection;
