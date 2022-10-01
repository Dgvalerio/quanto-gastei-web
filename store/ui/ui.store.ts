import { UiStoreModel } from '@/store/ui/ui.model';
import getTheme from '@/styles/theme';

import create from 'zustand';

const useUiStore = create<UiStoreModel>((set) => ({
  theme: getTheme('dark'),

  switchThemeMode: (): void =>
    set((previous) => ({
      theme: getTheme(
        previous.theme.palette.mode === 'light' ? 'dark' : 'light'
      ),
    })),
}));

export default useUiStore;
