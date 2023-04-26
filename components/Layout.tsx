import { Box } from "@chakra-ui/react";

import Head from "next/head";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Box display="flex">
    <Head>
      <meta
        name="description"
        content="Easily keep track of events set in different time zones"
      />
    </Head>

    <Sidebar />
    {children}
  </Box>
);

export default Layout;
