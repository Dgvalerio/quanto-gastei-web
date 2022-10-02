import { FC, ReactNode } from 'react';

import TopBar from '@/components/topbar';

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <TopBar />
    {children}
  </>
);

export default Layout;
