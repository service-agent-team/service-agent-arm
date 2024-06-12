import { UploadChangeParam } from 'antd/lib/upload/interface';

export interface IValuesForm {
  nameRu: string;
  nameEn: string;
  durationRu: string;
  durationEn: string;
  priceNoteEn: string;
  priceNoteRu: string;
  startingPrice: number;
  tourPrice: number;
  tourPriceUptoPersons: number;
  descriptionRu: string;
  descriptionEn: string;
  tourPriceDescriptionRu: string;
  tourPriceDescriptionEn: string;
  countryId: number;
  images: UploadChangeParam;
  videoUrl: UploadChangeParam;
  tourItenararyDescriptionImgUrl: UploadChangeParam;

  tourItenararyTitleRu: string;
  tourItenararyTitleEn: string;
  tourItenararyDescriptionRu: string;
  tourItenararyDescriptionEn: string;

  tourItenarary: TourItenarary[];
  tourPrices: TourPrices[];
}

export interface IFileResponse {
  ids: Id[];
  size: number;
}

export interface Id {
  id: number;
}

interface TourItenarary {
  id?: number;
  tourItenararyImgUrl: UploadChangeParam;
  tourItenararyTitleRu: string;
  tourItenararyTitleEn: string;
  tourItenararyDescriptionRu: string;
  tourItenararyDescriptionEn: string;
  tourItenararyHour: string;
}

interface TourPrices {
  id?: number;
  tourPrice: number;
  tourPriceUptoPersons: number;
  tourPriceDescriptionRu: string;
  tourPriceDescriptionEn: string;
}
