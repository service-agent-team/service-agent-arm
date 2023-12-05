import { theme } from 'antd';
import { token, components } from './config';
import { ETheme } from '@/store/app/types';

export const antTheme = (mode: ETheme) => ({
  token,
  components,
  algorithm: mode === ETheme.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,
});
