import { CountyCodeType, CurrencyType } from '@/store/lets-trip/tour/types';

export interface IValuesForm {
  nameUz: string;
  nameRu: string;
  nameEn: string;
  categoryId: number;
  companyId: number;
  descriptionUz: string;
  descriptionEn: string;
  descriptionRu: string;
  upTo2: number;
  upTo6: number;
  upTo10: number;
  upTo20: number;
  pictures: string[];
  currency: CurrencyType;
  countryCode: CountyCodeType;
  longitude: number;
  latitude: number;
  attributes?: any;
}
