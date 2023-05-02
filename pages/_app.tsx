import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { EventsProvider } from "@/context";
import { Inter } from "next/font/google";

import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

const theme = extendTheme({
  fonts: {
    body: inter.style.fontFamily,
    heading: inter.style.fontFamily,
  },
});

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <EventsProvider>
      <Component {...pageProps} />
    </EventsProvider>
  </ChakraProvider>
);

export default App;
