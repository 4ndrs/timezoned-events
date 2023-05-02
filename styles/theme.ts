import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const fonts = {
  body: inter.style.fontFamily,
  heading: inter.style.fontFamily,
};

const colors = {
  primary: {
    darkish: "#1a202c",
    whitish: "#fff",
    teal: "#319795",
    bg: "#f7fafc",
    sideHover: "#f7fafc",
  },
  dark: {
    darkish: "#fff",
    whitish: "#111c44",
    teal: "#81e6d9",
    bg: "#0b1437",
    sideHover: "#101939",
  },
};

const theme = extendTheme({ config, fonts, colors });

export default theme;
