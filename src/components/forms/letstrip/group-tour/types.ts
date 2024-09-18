import { UploadChangeParam } from 'antd/lib/upload/interface';

export interface IValuesForm {
  nameRu: string;
  nameEn: string;
  cityRu: string;
  cityEn: string;
  countryId: number;
  priceNoteRu: string;
  priceNoteEn: string;
  price: number;
  upTo2: number;
  upTo4: number;
  upTo6: number;
  upTo10: number;
  priceNotIncludeRu: string;
  priceNotIncludeEn: string;
  extraInformation: any;
  priceIncludeRu: string;
  priceIncludeEn: string;

  priceIncludes: IPriceInclude[];
  priceNotIncludes: IPriceNotInclude[];

  images: UploadChangeParam;
  descriptionRu: string;
  descriptionEn: string;
  tourItenarary: TourItinerary[];
  // availableDate: AvailableDate[];
}

export interface IFileResponse {
  ids: Id[];
  size: number;
}

export interface Id {
  id: number;
}

interface AvailableDate {
  month: string;
  year: string;
  departures: Departures[];
}

interface Departures {
  price: number;
  transferTypeEn: string;
  transferTypeRu: string;
  transferDate: string;
}

interface TourItinerary {
  id?: number;
  itineraryTitleEn: string;
  itineraryTitleRu: string;
  description: [
    {
      itineraryDescEn: string;
      itineraryDescRu: string;
      itineraryItemDescOrder: number;
      itineraryHour: string;
    },
  ];
  itineraryItemOrder: number;
  itineraryImgUrl: UploadChangeParam;
}

export interface IGoogleLocation {
  lat: number;
  lng: number;
}

export interface IGoogleMouseEvent {
  domEvent: MouseEvent | TouchEvent | PointerEvent | KeyboardEvent | Event;
  latLng: any | null;
  stop(): void;
}

interface IPriceInclude {
  priceIncludeEn: string;
  priceIncludeRu: string;
}
interface IPriceNotInclude {
  priceNotIncludeEn: string;
  priceNotIncludeRu: string;
}
