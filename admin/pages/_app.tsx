import Layout from "@/components/Layout";
import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";


export default function App({
  Component,
  pageProps,
}: AppProps<{ session: any }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
