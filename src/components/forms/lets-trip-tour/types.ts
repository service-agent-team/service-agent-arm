export interface IValuesForm {
  name: string;
  nameRu: string;
  categoryId: number;
  companyId: number;
  description: number;
  upTo2: number;
  upTo6: number;
  upTo10: number;
  upTo20: number;
  pictures: string | null[];
  currency: CurrencyType;
  attributes: Attributes;
  countryCode: string; // 'AE';
  longitude: number;
  latitude: number;
}

export enum CurrencyType {
  uzs = 'UZS',
  usd = 'USD',
}

export interface Attributes {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}
