import { ChakraProvider } from "@chakra-ui/react";
import { EventsProvider } from "@/context";
import { Inter } from "next/font/google";

import "@/styles/globals.css";

import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => (
  <div className={inter.className}>
    <ChakraProvider>
      <EventsProvider>
        <Component {...pageProps} />
      </EventsProvider>
    </ChakraProvider>
  </div>
);

export default App;
