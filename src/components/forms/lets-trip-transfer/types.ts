import { UploadChangeParam } from 'antd/es/upload';

export interface IValuesForm {
  name: string;
  categoryId: number;
  companyId: number;
  hourly: number;
  transfer: number;
  mediaLinks: UploadChangeParam;
  currency: string;
  releaseDate: string;
  attributes: any;
  countryCode: string;
}

export interface IFileResponse {
  ids: Id[];
  size: number;
}

export interface Id {
  id: number;
}
