import { UploadChangeParam } from 'antd/lib/upload/interface';

export interface IValuesForm {
  nameRu: string;
  nameEn: string;
  countryId: number;
  priceNoteRu: string;
  priceNoteEn: string;
  startingPrice: number;
  upTo2: number;
  upTo6: number;
  upTo10: number;
  upTo20: number;
  priceNotIncludeRu: string;
  priceNotIncludeEn: string;
  extraInformation: any;
  priceIncludeRu: string;
  priceIncludeEn: string;
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
