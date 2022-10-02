import UiStore from '@/store/ui/ui.model';
import getTheme from '@/styles/theme';

import create from 'zustand';

const useUiStore = create<UiStore.Model>((set) => ({
  themeMode: UiStore.ThemeMode.Dark,
  theme: getTheme(UiStore.ThemeMode.Dark),

  switchThemeMode: (): void =>
    set((previous) => {
      const themeMode =
        previous.themeMode === UiStore.ThemeMode.Light
          ? UiStore.ThemeMode.Dark
          : UiStore.ThemeMode.Light;

      return {
        theme: getTheme(themeMode),
        themeMode,
      };
    }),
}));

export default useUiStore;
