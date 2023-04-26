import Head from "next/head";

import Layout from "@/components/Layout";
import EventManager from "@/components/EventManager";

const Home = () => (
  <Layout>
    <Head>
      <title>Timezoned Events</title>
    </Head>

    <main>
      <EventManager />
    </main>
  </Layout>
);

export default Home;
