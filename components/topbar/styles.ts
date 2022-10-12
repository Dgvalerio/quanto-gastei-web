import { Grid, styled, Theme } from '@mui/material';
import { alpha } from '@mui/system';

import UiStore from '@/store/ui/ui.model';

const Container = styled(Grid)`
  z-index: 1299;
  box-shadow: 0 0 2px
    ${({ theme }: { theme: Theme }): string =>
      theme.palette.mode === UiStore.ThemeMode.Light
        ? '#c8cbd9'
        : alpha('#c8cbd9', 0.2)};

  > .logo {
    padding: 0.4rem 1.5rem;

    & > a {
      color: ${({ theme }): string => theme.palette.text.secondary};
      text-transform: none;
      text-decoration: none;
    }
  }

  > .link > a {
    color: ${({ theme }): string => alpha(theme.palette.text.secondary, 0.4)};
    text-transform: none;
    text-decoration: none;
  }
`;

const TopBarStyles = { Container };

export default TopBarStyles;
