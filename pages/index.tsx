import Head from "next/head";
import Layout from "@/components/Layout";
import EventViewer from "@/components/EventViewer";

const Home = () => (
  <Layout>
    <Head>
      <title>Timezoned Events</title>
    </Head>

    <main>
      <EventViewer />
    </main>
  </Layout>
);

export default Home;
