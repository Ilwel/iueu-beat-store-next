import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import client from "../client";
import Layout from '../components/Layout';
import RenderWhenMounted from '../components/RenderWhenMounted';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <RenderWhenMounted>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RenderWhenMounted>
    </ApolloProvider>
  )
}
