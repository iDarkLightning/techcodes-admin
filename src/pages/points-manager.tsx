import { Points, PrismaClient, Role } from ".prisma/client";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { withUser } from "../helpers/withUser";

const prisma = new PrismaClient();

const Points: React.FC<{ links: Points[] }> = ({ links }) => {
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");
  const router = useRouter();

  const submit = async () => {
    const res = await axios.post("/api/points", { value, name });
    console.log(res);
    window.location.reload();
  };

  return (
    <Flex>
      <Sidebar />
      <Box width="100%" bgColor="bg">
        <Box width="90%" margin="0 auto" padding="2% 0 ">
          <Heading color="accent.900">Points Manager</Heading>
          <HStack mt="2rem">
            <Input
              width="30%"
              variant="filled"
              bgColor="white"
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              width="20%"
              variant="filled"
              bgColor="white"
              placeholder="Value"
              onChange={(event) => setValue(parseInt(event.target.value))}
            />
            <Button
              bgColor="accent.900"
              color="bg"
              _hover={{ bgColor: "accent.800" }}
              fontWeight="normal"
              onClick={submit}
            >
              Generate
            </Button>
          </HStack>
          <VStack width="100%" mt="2rem">
            {links.map((link) => (
              <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                bgColor="white"
                p="0.5rem 1rem"
                borderRadius="20px"
                mb="1rem"
                key={link.id}
              >
                <Heading fontWeight="500" color="accent.900">
                  {link.name[0].toUpperCase() +
                    link.name.substring(1, link.name.length)}{" "}
                  - {link.value} Points
                </Heading>
                <Link
                  bgColor="accent.900"
                  color="bg"
                  _hover={{ bgColor: "accent.800" }}
                  fontWeight="normal"
                  p="1rem 1rem"
                  borderRadius="20px"
                  href={`points/${link.linkCode}`}
                  target="_blank"
                >
                  View
                </Link>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export const getServerSideProps = withUser(async ({ user }) => {
  if (!user) return { redirect: { destination: "/", permanent: false } };
  if (user.role !== Role.EXEC)
    return { redirect: { destination: "/dashboard", permanent: false } };

  const links = await prisma.points.findMany();

  return { props: { user, links } };
});

export default Points;
