import { Points } from ".prisma/client";
import {
    chakra,
    Grid,
    GridItem,
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
        <Grid templateColumns="5fr 1fr 1fr" padding="1rem" fontWeight="bold">
            <GridItem alignSelf="center">{point.name}</GridItem>
            <GridItem alignSelf="center">
                <Link
                    bgColor="accent.900"
                    color="#F6F6F6"
                    fontWeight="400"
                    p="0.5rem 0.8rem"
                    borderRadius="1.2rem"
                    href={`/points/${point.linkCode}`}
                    target="_blank"
                >
                    Send
                </Link>
            </GridItem>
            <GridItem alignSelf="center">
                <Link
                    bgColor="accent.900"
                    color="#F6F6F6"
                    fontWeight="400"
                    p="0.5rem 0.8rem"
                    borderRadius="1.2rem"
                    href={`/points/${point.linkCode}`}
                    target="_blank"
                >
                    Edit
                </Link>
            </GridItem>
        </Grid>
    );
};

export default PointLinkRow;
