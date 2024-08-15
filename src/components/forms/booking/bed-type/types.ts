import { FacilityLanguageType } from '@/store/booking/facility/types';

export interface IValues {
  name: string;
  description: string;
  size: string;
  lang: FacilityLanguageType;
}
