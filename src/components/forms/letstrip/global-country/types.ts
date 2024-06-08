import { Location } from '@/store/lets-trip/global-country/types';

export interface IValuesForm {
  nameEn: string;
  nameRu: string;
  nameUz: string;
  code: string;
  lowerCorner: Location;
  upperCorner: Location;
}
