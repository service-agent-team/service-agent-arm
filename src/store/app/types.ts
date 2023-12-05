import { Action, Location } from 'history';

export type TInitialState = {
  path: string;
  theme: ETheme;
  isAdd: boolean;
  action: Action;
  location: Location;
  isModal: boolean;
  isDrawer: boolean;
  previewImage: string;
  previewTitle: string;
};

export enum ETheme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}
