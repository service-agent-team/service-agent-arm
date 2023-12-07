import { ETheme } from '@/store/app/types';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '.';

export const useThemeDetector = () => {
  const { theme } = useTypedSelector((state) => state.app);
  const getCurrentTheme = (): boolean => window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());

  const mqListener = (e: MediaQueryListEvent): void => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    const darkThemeMq: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    darkThemeMq.addEventListener('change', mqListener);

    return () => darkThemeMq.removeEventListener('change', mqListener);
  }, []);

  if (theme === ETheme.SYSTEM) {
    return isDarkTheme ? ETheme.DARK : ETheme.LIGHT;
  }

  return theme;
};
