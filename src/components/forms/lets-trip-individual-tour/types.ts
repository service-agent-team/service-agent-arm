import { UploadChangeParam } from 'antd/lib/upload/interface';

export interface IValuesForm {
  nameRu: string;
  nameEn: string;
  durationRu: string;
  durationEn: string;
  priceNoteRu: string;
  priceNoteEn: string;
  tourItenararyTitleRu: string;
  tourItenararyTitleEn: string;
  startingPrice: number;
  tourPrice: number;
  descriptionRu: string;
  descriptionEn: string;
  tourPriceDescriptionRu: string;
  tourPriceDescriptionEn: string;
  tourItenararyDescriptionRu: string;
  tourItenararyDescriptionEn: string;
  countryId: number;
  images: UploadChangeParam;
  videoUrl: UploadChangeParam;
  tourItenararyDescriptionImgUrl: UploadChangeParam;
}

export interface IFileResponse {
  ids: Id[];
  size: number;
}

export interface Id {
  id: number;
}
