import { Points } from ".prisma/client";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import QRCode from "qrcode.react";
import React from "react";
import ReedembedBy from "../components/ReedembedBy";
import { Sidebar } from "../../../components/Sidebar";
import {
  namedOperations,
  usePointsQuery,
  useTogglePointsMutation,
} from "../../../generated/graphql";
import { gql, useApolloClient } from "@apollo/client";

interface ExecPointsPageProps {
  link: Points;
}

export const ExecPointsPage: React.FC<ExecPointsPageProps> = ({ link }) => {
  const [toggle] = useTogglePointsMutation();

  return (
    <Flex flexDirection={{ base: "column", md: "row" }}>
      <Sidebar />
      <Flex
        height={{ base: "85vh", md: "90vh" }}
        m={{ base: "2rem auto 0 auto", md: "auto" }}
        flexDirection={{ base: "column", md: "row" }}
        width="90%"
      >
        <Flex
          flex="1"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          as={Stack}
          spacing={10}
        >
          <Heading fontSize="3.5vmax">
            {link.name} - {link.value} Points
          </Heading>
          <QRCode
            value={`${process.env.NEXT_PUBLIC_URL}/points/${link.linkCode}`}
            size={400}
          />
          <Button
            bgColor={link.enabled ? "#ff6961" : "secondary"}
            width="50%"
            borderRadius="none"
            onClick={async () => {
              await toggle({
                variables: { input: { id: link.id, value: !link.enabled } },
              });
            }}
          >
            {link.enabled ? "Disable" : "Enable"}
          </Button>
        </Flex>
        <Box
          flex="1"
          bgColor="#f6f6f6"
          mt={{ base: "2rem", md: null }}
          overflow="auto"
        >
          <ReedembedBy link={link} />
        </Box>
      </Flex>
    </Flex>
  );
};
