import { ChakraProvider } from "@chakra-ui/react";
import { EventsProvider } from "@/context";
import { theme } from "@/styles";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <EventsProvider>
      <Component {...pageProps} />
    </EventsProvider>
  </ChakraProvider>
);

export default App;
