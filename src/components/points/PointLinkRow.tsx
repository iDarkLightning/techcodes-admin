import { Points } from ".prisma/client";
import {
  Button,
  Grid,
  GridItem,
  chakra,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useSWRConfig } from "swr";

interface PointLinkRowProps {
  point: Points;
}

const PointLinkRow: React.FC<PointLinkRowProps> = ({ point }) => {
  const mobileGrid = useBreakpointValue({ base: true, md: false });
  const { mutate } = useSWRConfig();

  const toggle = async () => {
    await axios.patch("/api/points", {
      id: point.id,
      value: !point.enabled,
    });

    mutate("/api/points");
  };

  return (
    <Grid
      templateColumns={mobileGrid ? "1fr 1fr 1fr" : "1fr 1fr 1fr 1fr 1fr"}
      padding="1rem"
      fontWeight="bold"
    >
      <GridItem alignSelf="center">{point.name}</GridItem>
      <GridItem alignSelf="center">{point.value}</GridItem>
      {!mobileGrid && <GridItem alignSelf="center">{point.linkCode}</GridItem>}
      {!mobileGrid && (
        <GridItem alignSelf="center">
          <chakra.span
            bgColor={point.enabled ? "secondary" : "#ff6961"}
            p="0.4rem"
            borderRadius="20px"
            onClick={toggle}
            cursor="pointer"
            _hover={{ opacity: "80%", transition: "opacity ease-in 200ms" }}
          >
            {point.enabled ? "Active" : "Inactive"}
          </chakra.span>
        </GridItem>
      )}
      <GridItem alignSelf="center">
        <Link
          bgColor="secondary"
          p="0.8rem"
          href={`/points/${point.linkCode}`}
          target="_blank"
        >
          View
        </Link>
      </GridItem>
    </Grid>
  );
};

export default PointLinkRow;
