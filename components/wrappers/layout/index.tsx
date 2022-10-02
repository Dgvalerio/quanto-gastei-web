import { FC, ReactNode } from 'react';

import { Box } from '@mui/material';

import TopBar from '@/components/topbar';

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <TopBar />
    <Box p={2}>{children}</Box>
  </>
);

export default Layout;
