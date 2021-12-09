import { Points } from ".prisma/client";
import {
  chakra,
  Grid,
  GridItem,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import {
  namedOperations,
  PointsReturnFragment,
  useTogglePointsMutation,
} from "../../../generated/graphql";

interface PointLinkRowProps {
  point: Points;
}

const PointLinkRow: React.FC<{ point: PointsReturnFragment }> = ({ point }) => {
  const mobileGrid = useBreakpointValue({ base: true, md: false });
  const [toggle] = useTogglePointsMutation();

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
            onClick={async () => {
              await toggle({
                variables: { input: { id: point.id, value: !point.enabled } },
                refetchQueries: [namedOperations.Query.Points],
              });
            }}
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
