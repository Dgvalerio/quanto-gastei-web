import type { NextPage } from 'next';
import Head from 'next/head';

const Dashboard: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Quanto Gastei?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Quanto Gastei?</h1>
        <h2>Authenticated</h2>
      </main>
    </div>
  );
};

export default Dashboard;
