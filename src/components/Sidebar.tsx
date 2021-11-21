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
        w={{ base: "100vw", md: "4rem" }}
        h={{ base: "4rem", md: "100vh" }}
        position={{ base: "absolute", md: "relative" }}
        bgColor="accent.900"
        flexDirection={{ base: "row", md: "column" }}
        alignItems="center"
        justifyContent="space-between"
        padding={{ base: "0 4%", md: "2% 0" }}
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
