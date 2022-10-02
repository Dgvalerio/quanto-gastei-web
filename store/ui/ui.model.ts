import { Theme } from '@mui/material';

namespace UiStore {
  export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
  }

  export interface Model {
    theme: Theme;
    themeMode: ThemeMode;

    switchThemeMode(): void;
  }
}

export default UiStore;
