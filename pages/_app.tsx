import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";

import "@/styles/globals.css";

import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => (
  <div className={inter.className}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </div>
);

export default App;
