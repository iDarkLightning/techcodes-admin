import { Flex, IconButton, Image, Link, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { FiLogOut } from "react-icons/fi";

const MotionFlex = motion(Flex);

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
  <MotionFlex
    w="4rem"
    h="100vh"
    bgColor="accent.900"
    flexDirection="column"
    alignItems="center"
    justifyContent="space-between"
    padding="2% 0 2% 0"
    initial={{ x: "-100%" }}
    animate={{ x: 0 }}
    transition={{ delay: 0.2, ease: [0.7, 0, 0.07, 1], duration: 1.5 }}
  >
    <SVGLink to="/" src="logo.svg" alt="Logo"></SVGLink>
    <IconButton
      icon={<FiLogOut />}
      aria-label="log out"
      onClick={() => signOut()}
    />
  </MotionFlex>
);
