import { createSlice } from '@reduxjs/toolkit';
import { getCompany } from './actions';
import { ICarTypeInitalState } from './types';

const initialState: ICarTypeInitalState = {
  loading: {
    get: false,
    post: false,
    patch: false,
    delete: false,
  },
  companies: null,
  company: null,
  errors: null,
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompany.pending, (state) => {
        state.loading.get = true;
        state.errors = null;
      })
      .addCase(getCompany.fulfilled, (state, { payload: { data } }) => {
        state.loading.get = false;
        state.companies = data.content;
        state.errors = null;
      });
  },
});

export const CompanyReducer = companySlice.reducer;
export const CompanySliceActions = companySlice.actions;
