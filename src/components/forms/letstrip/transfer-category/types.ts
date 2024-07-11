import { UploadChangeParam } from 'antd/es/upload';

export interface IValuesForm {
  nameEn: string;
  nameRu: string;
  nameUz: string;
  startingPrice: number;
  seats: number;
  luggage: number;
  priority: number;
  image: UploadChangeParam;
}
