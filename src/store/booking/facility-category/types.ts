import { FacilityLanguageType } from '../facility/types';

export interface InitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    put: boolean;
    delete: boolean;
  };
  facilityCategories: IFacilityCategory[] | null;
  facilityCategory: IFacilityCategory | null;
  errors: unknown | string[] | string;
}

export interface IFacilityCategory {
  id: number;
  name: string;
  FacilityLanguageType: FacilityLanguageType;
}

export interface IFacilityCategoryResponse {
  content: IFacilityCategory[];
  count: number;
}

export interface IFacilityCategoryPayload {
  page: number;
  size: number;
}
