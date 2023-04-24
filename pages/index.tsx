import Head from "next/head";

import { EventsProvider } from "@/context";
import EventManager from "@/components/eventManager";
import Layout from "@/components/Layout";

const Home = () => (
  <Layout>
    <Head>
      <title>Timezoned Events</title>
    </Head>

    <EventsProvider>
      <EventManager />
    </EventsProvider>
  </Layout>
);

export default Home;
