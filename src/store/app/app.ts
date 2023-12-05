import { THEME, getLocalStorage, setLocalStorage } from '@/libs';
import { createSlice } from '@reduxjs/toolkit';
<<<<<<< HEAD
import { ENDPOINTS } from '../exdpoints';
import { ETheme, TInitialState } from './types';
import { RootState } from '../types';
=======
import { ENDPOINTS } from '../endpoints';
import { RootState } from '../store-interfaces';
import { ETheme, TInitialState } from './types';
>>>>>>> 9cc14a7cc27f2b4ccb4e41492ddd1e7514a7f178

const initialState: TInitialState = {
  isModal: false,
  isDrawer: false,
  theme: getLocalStorage(THEME) ?? ETheme.LIGHT,
<<<<<<< HEAD
=======
  path: '',
  isAdd: false,
  previewTitle: '',
>>>>>>> 9cc14a7cc27f2b4ccb4e41492ddd1e7514a7f178
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
