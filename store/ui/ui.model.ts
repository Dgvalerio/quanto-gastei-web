import { Theme } from '@mui/material';

export interface UiStoreModel {
  theme: Theme;

  switchThemeMode(): void;
}
