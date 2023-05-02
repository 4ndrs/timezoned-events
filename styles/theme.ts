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

const theme = extendTheme({ config, fonts });

export default theme;
