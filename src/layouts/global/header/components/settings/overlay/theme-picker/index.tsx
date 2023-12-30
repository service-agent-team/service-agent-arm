import { MoonSunSwitch } from '@/components';
import React from 'react';

export const ThemePicker: React.FC = () => {
  const theme = 'dark';

  const handleClickButton = (_: any) => {};

  return (
    <MoonSunSwitch
      isMoonActive={theme === 'dark'}
      onClickMoon={() => handleClickButton('dark')}
      onClickSun={() => handleClickButton('light')}
    />
  );
};
