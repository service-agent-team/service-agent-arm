import { UploadChangeParam } from 'antd/es/upload';

export interface IValuesForm {
  nameEn: string;
  nameRu: string;
  imageUrl: UploadChangeParam;
  code: string;
}

export interface IFileResponse {
  ids: Id[];
  size: number;
}

export interface Id {
  id: number;
}
