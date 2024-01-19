export type TInitialState = {
  isModal: boolean;
  isDrawer: boolean;
  theme: ETheme;
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
  key?: string;
  icon: string;
  label: string;
}

export interface MenuChildren {
  key: string;
  label: string;
}
