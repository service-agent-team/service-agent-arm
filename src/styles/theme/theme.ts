<<<<<<< HEAD
import { ETheme } from '@/store/app/types';
import { theme } from 'antd';
import { components, token } from './config';
=======
import { theme } from 'antd';
import { token, components } from './config';
import { ETheme } from '@/store/app/types';
>>>>>>> 9cc14a7cc27f2b4ccb4e41492ddd1e7514a7f178

export const antTheme = (mode: ETheme) => ({
  token,
  components,
  algorithm: mode === ETheme.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,
});
