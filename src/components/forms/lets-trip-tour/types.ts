import { ExtraInformation } from '@/store/lets-trip/tour/types';
import { UploadChangeParam } from 'antd/lib/upload/interface';

export interface IValuesForm {
  nameUz: string;
  nameRu: string;
  nameEn: string;
  countryId: number;
  priceNoteRu: string;
  priceNoteEn: string;
  startingPrice: number;
  priceNotIncludeRu: string;
  priceNotIncludeEn: string;
  extraInformation: any;
  priceIncludeRu: string;
  priceIncludeEn: string;
  images: UploadChangeParam;
  descriptionRu: string;
  descriptionEn: string;
  longitude: number;
  latitude: number;
  availableMonth: string;
  availableYear: string;
  availablePrice: number;
  transferTypeRu: string;
  transferTypeEn: string;
  transferDate: string;
  itineraryTitleEn: string;
  itineraryTitleRu: string;
  itineraryDescEn: string;
  itineraryDescRu: string;
  itineraryImgUrl: UploadChangeParam;
}

export interface IFileResponse {
  ids: Id[];
  size: number;
}

export interface Id {
  id: number;
}
