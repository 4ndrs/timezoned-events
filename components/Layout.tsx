import Head from "next/head";
import { Box } from "@chakra-ui/react";

import Sidebar from "./Sidebar";
import Footer from "./Footer";

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
      justifyContent="space-between"
      flex="1"
    >
      <Box mt="auto" mb="auto">
        {children}
      </Box>
      <Footer />
    </Box>
  </Box>
);

export default Layout;
