export type TInitialState = {
  isModal: boolean;
  isDrawer: boolean;
  theme: ETheme;
  path: string;
  isAdd: boolean;
  previewTitle: string;
  previewImage: string;
  menu: IMenu[];
  fileList: any[];
  imageId: number;
  pagination: IPagination;
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

export interface IPagination {
  current: number;
  pageSize: number;
  total: number;
}
