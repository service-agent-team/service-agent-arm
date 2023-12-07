import { THEME, setLocalStorage } from '@/libs';
import { createSlice } from '@reduxjs/toolkit';
import { ENDPOINTS } from '../endpoints';
import { ETheme } from './types';

const initialState: any = {
  isModal: false,
  isDrawer: false,
  theme: ETheme.LIGHT,
  path: '',
  isAdd: false,
  previewTitle: '',
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
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
