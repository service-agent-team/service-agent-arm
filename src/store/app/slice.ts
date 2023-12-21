import { THEME, setLocalStorage } from '@/libs';
import { createSlice } from '@reduxjs/toolkit';
import { ENDPOINTS } from '../endpoints';
import { ETheme, TInitialState } from './types';

const initialState: TInitialState = {
  isModal: false,
  isDrawer: false,
  theme: ETheme.LIGHT,
  path: '',
  isAdd: false,
  previewTitle: '',
  menu: [],
};

const appSlice = createSlice({
  name: ENDPOINTS.app,
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
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
