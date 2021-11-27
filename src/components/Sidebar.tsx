import { Flex, IconButton, Image, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import React from "react";
import { FiLogOut } from "react-icons/fi";

const SVGLink: React.FC<{
  to: string;
  src: string;
  alt: string;
  newTab?: boolean;
}> = ({ to, src, alt, newTab }) => (
  <Link href={to} target={newTab ? "_blank" : undefined}>
    <Image src={src} alt={alt} />
  </Link>
);

export const Sidebar: React.FC = () => (
  <Flex
    alignItems="center"
    justifyContent="space-between"
    w={{ base: "100%", md: "4rem" }}
    h={{ base: "4rem", md: "100vh" }}
    position="sticky"
    top="0"
    bgColor="accent.900"
    flexDirection={{ base: "row", md: "column" }}
    padding={{ base: "2.5rem 10%", md: "2% 0" }}
  >
    <SVGLink to="/" src="/logo.svg" alt="Logo" />
    <IconButton
      bgColor={{ base: "white", md: "accent.900" }}
      color={{ base: "accent.900", md: "white" }}
      width="3rem"
      height="3rem"
      icon={<FiLogOut />}
      aria-label="log out"
      onClick={() => signOut()}
    />
  </Flex>
);
