import { createTheme, Theme } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles/createTheme';

const darkTheme: ThemeOptions = { palette: { mode: 'dark' } };

const lightTheme: ThemeOptions = { palette: { mode: 'light' } };

const getTheme = (themeMode: 'light' | 'dark'): Theme =>
  createTheme(themeMode === 'light' ? lightTheme : darkTheme);

export default getTheme;
