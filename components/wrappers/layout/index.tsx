import { FC, ReactNode } from 'react';

import { Box } from '@mui/material';

import Loading from '@/components/loading';
import TopBar from '@/components/topbar';
import useOperationTypeStore from '@/src/operation-type/operation-type.store';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { loading } = useOperationTypeStore();

  return (
    <>
      <TopBar />
      <Box p={2}>{children}</Box>
      {loading && <Loading />}
    </>
  );
};

export default Layout;
