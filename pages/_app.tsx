import { NextPage } from 'next';
import type { AppProps } from 'next/app';

import AuthWrapper from '@/components/wrappers/auth-wrapper';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <AuthWrapper>
    <Component {...pageProps} />
  </AuthWrapper>
);

export default MyApp;
