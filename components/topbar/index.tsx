import React, { FC } from 'react';
import { useState, MouseEvent, useEffect } from 'react';

import Link from 'next/link';

import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import TopBarStyles from '@/components/topbar/styles';
import UiStore from '@/store/ui/ui.model';
import useUiStore from '@/store/ui/ui.store';
import { routes } from '@/utils/pages';
import { getAuth } from '@firebase/auth';

const { Container } = TopBarStyles;

const TopBar: FC = () => {
  const { switchThemeMode, themeMode } = useUiStore();

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>();
  const [nextThemeMode, setNextThemeMode] = useState<UiStore.ThemeMode>(
    themeMode === UiStore.ThemeMode.Light
      ? UiStore.ThemeMode.Dark
      : UiStore.ThemeMode.Light
  );

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>): void =>
    setAnchorElUser(event.currentTarget);

  const handleCloseUserMenu = (): void => setAnchorElUser(null);

  const handleSignOut = async (): Promise<void> => await auth.signOut();

  useEffect(() => {
    setNextThemeMode(
      themeMode === UiStore.ThemeMode.Light
        ? UiStore.ThemeMode.Dark
        : UiStore.ThemeMode.Light
    );
  }, [themeMode]);

  return (
    <Container container alignItems="center">
      <Grid item className="logo">
        <Typography variant="h4" component={Link} href={routes.home()}>
          Quanto gastei?
        </Typography>
      </Grid>
      <Grid item className="link">
        <Link href={routes.operationTypes()}>Operation Types</Link>
      </Grid>
      <Grid item ml="auto">
        <Tooltip title={`Trocar para ${nextThemeMode} mode`} arrow>
          <IconButton
            size="large"
            aria-label={`Trocar para ${nextThemeMode} mode`}
            color="inherit"
            onClick={switchThemeMode}
          >
            {nextThemeMode === UiStore.ThemeMode.Dark ? (
              <LightModeIcon color="disabled" />
            ) : (
              <DarkModeIcon color="disabled" />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Abrir opções" arrow>
          <IconButton onClick={handleOpenUserMenu} className="user-button">
            <Avatar
              alt={`${currentUser?.displayName}`}
              src={`${currentUser?.photoURL}`}
            />
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleSignOut}>
            <Typography textAlign="center">Sair</Typography>
          </MenuItem>
        </Menu>
      </Grid>
    </Container>
  );
};

export default TopBar;
