import Head from "next/head";
import styles from "./layout.module.css";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.container}>
    <Head>
      <meta
        name="description"
        content="Easily keep track of events set in different time zones"
      />
    </Head>

    <main className={styles.main}>{children}</main>
  </div>
);

export default Layout;
