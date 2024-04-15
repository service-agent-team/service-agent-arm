import { Attributes } from '@/store/lets-trip/transfer/types';

export interface IValuesForm {
  name: string;
  categoryId: number;
  companyId: number;
  hourly: number;
  transfer: number;
  mediaLinks: string[];
  currency: string;
  releaseDate: string;
  attributes: Attributes;
  countryCode: string;
}
