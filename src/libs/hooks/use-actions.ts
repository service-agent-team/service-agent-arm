import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
<<<<<<< HEAD
import { AllActions } from '../../store/root/actions';
=======
import { bindActionCreators } from '@reduxjs/toolkit';
import { AllActions } from '@/store/root';
import { AppDispatch } from '@/store/store-interfaces';
>>>>>>> 9cc14a7cc27f2b4ccb4e41492ddd1e7514a7f178

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useMemo(() => bindActionCreators(AllActions, dispatch), [dispatch]);
};
