import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";

import "@/styles/globals.css";

import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider>
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  </ChakraProvider>
);

export default App;
