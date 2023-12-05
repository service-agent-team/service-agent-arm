import { appSelector } from '@/store/app';
import { ETheme } from '@/store/app/types';
import { useState, useEffect } from 'react';
import { useAppSelector } from '.';

export const useThemeDetector = () => {
  const { theme } = useAppSelector(appSelector);
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