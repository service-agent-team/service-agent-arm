import { TypedUseSelectorHook, useSelector } from 'react-redux';
<<<<<<< HEAD
import { RootState } from '../../store/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
=======
import { RootState } from '@/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
>>>>>>> 9cc14a7cc27f2b4ccb4e41492ddd1e7514a7f178
