import { TBreakfast } from '@/types/booking';

export interface InitialSate {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    put: boolean;
    delete: boolean;
  };
  modal: {
    delete: boolean;
    translation: boolean;
  };
  selectable_id: number | null;
  breakfasts: TBreakfast[];
  breakfast: TBreakfast | null;
}
