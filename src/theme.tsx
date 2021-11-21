import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

import "@fontsource/poppins";

const fonts = { body: "Poppins" };

const breakpoints = createBreakpoints({
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
});

const theme = extendTheme({
    color: "#000066",
    colors: {
        bg: "#F2F7FF",
        accent: {
            700: "#77779D",
            800: "#000099",
            900: "#000066",
        },
        gradient: {
            red: "linear-gradient(36.22deg, #FF7070 13.34%, rgba(255, 112, 112, 0) 271.29%)",
            purple: "linear-gradient(32.5deg, #AC6DEB -11.61%, rgba(169, 109, 229, 0.937435) 7.02%, rgba(158, 113, 203, 0.649021) 92.86%, rgba(136, 119, 154, 0.12) 250.31%)",
            yellow: "linear-gradient(31.73deg, #FFCC66 -39.07%, rgba(255, 204, 102, 0) 255.96%);",
            green: "linear-gradient(35.48deg, #7BEDB0 -43.19%, rgba(123, 237, 176, 0) 265.91%);",
        },
    },
    fonts,
    breakpoints,
});

export default theme;
