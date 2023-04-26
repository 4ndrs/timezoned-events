import { Box } from "@chakra-ui/react";

import Head from "next/head";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Box display="flex" backgroundColor="gray.50">
    <Head>
      <meta
        name="description"
        content="Easily keep track of events set in different time zones"
      />
    </Head>

    <Sidebar />
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      ml="auto"
      mr="auto"
    >
      {children}
    </Box>
  </Box>
);

export default Layout;
