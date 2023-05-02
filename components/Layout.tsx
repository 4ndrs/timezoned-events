import Head from "next/head";
import { Box, useColorModeValue } from "@chakra-ui/react";

import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const bgColor = useColorModeValue("primary.bg", "dark.bg");

  return (
    <Box display="flex" backgroundColor={bgColor}>
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
};

export default Layout;
