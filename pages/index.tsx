import Head from "next/head";

import Layout from "@/components/Layout";
import EventManager from "@/components/EventManager";

import { EventsProvider } from "@/context";

const Home = () => (
  <Layout>
    <Head>
      <title>Timezoned Events</title>
    </Head>

    <main>
      <EventsProvider>
        <EventManager />
      </EventsProvider>
    </main>
  </Layout>
);

export default Home;
