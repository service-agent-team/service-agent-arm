import { UploadChangeParam } from 'antd/es/upload';

export interface IValues {
  titleEn: string;
  titleRu: string;
  itemOrder: number;
  itineraryImgUrl: UploadChangeParam;
  description: IDescription[];
}

interface IDescription {
  descEn: string;
  descRu: string;
  itemDescOrder: number;
  hour: string;
}
