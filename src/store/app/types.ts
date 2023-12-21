import { Action, Location } from 'history';

export type TInitialState = {
  isModal: boolean;
  isDrawer: boolean;
  theme: ETheme.LIGHT;
  path: string;
  isAdd: boolean;
  previewTitle: string;
  menu: IMenu[];
};

export enum ETheme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export interface IMenu {
  key: string;
  icon: string;
  label: string;
}
