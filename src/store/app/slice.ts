import { THEME, setLocalStorage } from '@/common';
import { createSlice } from '@reduxjs/toolkit';
import { ETheme, TInitialState } from './types';

const initialState: TInitialState = {
  isModal: false,
  isDrawer: false,
  theme: ETheme.LIGHT,
  path: '',
  imageId: 0,
  fileList: [],
  isAdd: false,
  previewTitle: '',
  previewImage: '',
  menu: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showDrawer: (state) => {
      state.isDrawer = true;
    },

    closeDrawer: (state) => {
      state.isDrawer = false;
    },

    setModal: (state, { payload }) => {
      state.isModal = payload;
    },

    setTheme: (state, { payload }) => {
      setLocalStorage(THEME, payload);
      state.theme = payload;
    },

    setMenu: (state, { payload }) => {
      state.menu = payload;
    },

    setImageId: (state, { payload }) => {
      state.imageId = payload;
    },

    setFileList: (state, { payload }) => {
      state.fileList = payload;
    },

    setPreviewImage: (state, { payload }) => {
      state.previewImage = payload;
    },

    setPreviewTitle: (state, { payload }) => {
      state.previewTitle = payload;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
