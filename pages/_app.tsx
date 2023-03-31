import { Inter } from "next/font/google";
import "@/styles/globals.css";

import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => (
  <main className={inter.className}>
    <Component {...pageProps} />
  </main>
);

export default App;
