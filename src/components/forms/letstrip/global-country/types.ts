import { UploadChangeParam } from 'antd/es/upload';

export interface IValuesForm {
  nameEn: string;
  nameRu: string;
  nameUz: string;
  code: string;
  pictureUrl: UploadChangeParam;
}

export interface IFileResponse {
  ids: Id[];
  size: number;
}

export interface Id {
  id: number;
}
