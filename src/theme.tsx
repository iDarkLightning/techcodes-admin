import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    bg: "#F2F7FF",
    accent: {
      800: "#000099",
      900: "#000066",
    },
  },
  fonts,
  breakpoints,
});

export default theme;
