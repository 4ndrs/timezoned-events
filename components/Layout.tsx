import Head from "next/head";
import { Box, useColorModeValue } from "@chakra-ui/react";

import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const bgColor = useColorModeValue("primary.bg", "dark.bg");

  return (
    <Box
      display="flex"
      flexDirection={["column", null, null, null, "row"]}
      backgroundColor={bgColor}
    >
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
        minHeight={["calc(100vh - 50px)", null, null, null, "100vh"]}
        flex="1"
      >
        <Box m="auto 0">{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
