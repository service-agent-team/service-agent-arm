import { UploadChangeParam } from 'antd/es/upload';

export interface IValuesForm {
  nameEn: string;
  nameRu: string;
  nameUz: string;
  carCategoryId: number;
  seats: number;
  luggage: number;
  pictures: UploadChangeParam;
  manufactureDate: string;
}

export interface IFileResponse {
  ids: Id[];
  size: number;
}

export interface Id {
  id: number;
}
