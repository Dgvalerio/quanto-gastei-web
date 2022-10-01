import { FC, ReactNode } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import useUiStore from '@/store/ui/ui.store';
import globalStyles from '@/styles/global';
import { Global } from '@emotion/react';

const StyleWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme } = useUiStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles(theme)} />
      {children}
    </ThemeProvider>
  );
};

export default StyleWrapper;
