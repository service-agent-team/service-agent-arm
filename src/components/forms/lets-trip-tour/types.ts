import { Attributes, CountyCodeType, CurrencyType } from '@/store/lets-trip/tour/types';
import { UploadChangeParam } from 'antd/lib/upload/interface';

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
  pictures: UploadChangeParam;
  currency: CurrencyType;
  countryCode: CountyCodeType;
  longitude: number;
  latitude: number;
  attributes?: Attributes;
}

export interface IFileResponse {
  groupId: string;
  mediaList: IMediaList[];
  directory: Directory2;
  size: number;
}
export interface IMediaList {
  id: number;
  originalName: string;
  contentType: string;
  extension: string;
  size: number;
  directory: Directory;
  type: string;
}

export interface Directory {
  directoryId: string;
  name: string;
  createdAt: string;
}

export interface Directory2 {
  directoryId: string;
  name: string;
  createdAt: string;
}
