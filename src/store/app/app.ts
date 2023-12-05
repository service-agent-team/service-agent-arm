import { THEME, getLocalStorage, setLocalStorage } from '@/libs';
import { createSlice } from '@reduxjs/toolkit';
import { ENDPOINTS } from '../endpoints';
import { RootState } from '../store-interfaces';
import { ETheme, TInitialState } from './types';

const initialState: TInitialState = {
  isModal: false,
  isDrawer: false,
  theme: getLocalStorage(THEME) ?? ETheme.LIGHT,
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
export const appSelector = (state: RootState) => state.app;
export const appReducer = appSlice.reducer;
