import { useActions, useTypedSelector } from '@/common/hooks';
import { MoonSunSwitch } from '@/components';
import React from 'react';

export const ThemePicker: React.FC = () => {
  const { theme } = useTypedSelector((state) => state.app);

  const { setTheme } = useActions();

  const handleClickButton = (type: any) => {
    setTheme(type);
  };

  return (
    <MoonSunSwitch
      isMoonActive={theme === 'dark'}
      onClickMoon={() => handleClickButton('dark')}
      onClickSun={() => handleClickButton('light')}
    />
  );
};
