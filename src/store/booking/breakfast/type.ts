import { TBreakfast } from '@/types/booking';

export interface InitialSate {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  modal: {
    delete: boolean;
  };
  breakfasts: TBreakfast[];
  breakfast: TBreakfast | null;
}
