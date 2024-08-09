import { FacilityLanguageType, FacilityType } from '@/store/booking/facility/types';

export interface IValues {
  name: string;
  description: string;
  facilityType: FacilityType;
  categoryId: string;
  isCommon: true;
  lang?: FacilityLanguageType;
}
