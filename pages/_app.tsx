import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import AuthWrapper from '@/components/wrappers/auth-wrapper';
import StyleWrapper from '@/components/wrappers/style-wrapper';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <title>Quanto Gastei?</title>
      <meta name="description" content="Assistente para controle de gastos" />
      <link rel="icon" href="/fav.png" />
    </Head>
    <AuthWrapper>
      <StyleWrapper>
        <Component {...pageProps} />
      </StyleWrapper>
    </AuthWrapper>
  </>
);

export default MyApp;
