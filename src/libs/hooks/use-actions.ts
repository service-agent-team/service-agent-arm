import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { AllActions } from '@/store/root';
import { AppDispatch } from '@/store/store-interfaces';

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useMemo(() => bindActionCreators(AllActions, dispatch), [dispatch]);
};
