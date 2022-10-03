import { ToastContainer } from 'react-toastify';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import AuthWrapper from '@/components/wrappers/auth-wrapper';
import Layout from '@/components/wrappers/layout';
import StyleWrapper from '@/components/wrappers/style-wrapper';

import 'react-toastify/dist/ReactToastify.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <title>Quanto Gastei?</title>
      <meta name="description" content="Assistente para controle de gastos" />
      <link rel="icon" href="/fav.png" />
    </Head>
    <StyleWrapper>
      <AuthWrapper>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </AuthWrapper>
    </StyleWrapper>
  </>
);

export default MyApp;
