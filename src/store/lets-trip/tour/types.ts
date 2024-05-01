export interface ILetsTripGroupTourInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  groupTours: ILetsTripGroupTour[] | null;
  groupTour: ILetsTripGroupTour | null;
  errors: unknown | string[] | string;
}

export interface ILetsTripGroupTour {
  tourId: number;
  extraInformation: ExtraInformation;
  tourItenarary: TourItinerary[];
  images: string[];
  startingPrice: number;
  name: Name;
  availableDate: AvailableDate[];
  description: Description2[];
  locations: Location[];
  priceIncludes: PriceIncludes;
  priceNotIncludes: PriceNotIncludes;
  priceNote: PriceNote;
  country: Country;
  deleted?: boolean;
  createdAt?: string;
}

export interface ILetsTripGroupTourResponse {
  content: ILetsTripGroupTour[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort2;
  first: boolean;
  empty: boolean;
}

export interface IGetOneLetsTripTourResponse extends ILetsTripGroupTour {}

export interface ILetsTripGroupTourCreateResponse extends ILetsTripGroupTour {}

export interface ILetsTripGroupTourPayload {
  callback(): void;
  page: number;
  size: number;
}

export interface ILetsTripGroupTourGetOnePayload {
  callback(): void;
  id: string;
}

export interface ILetsTripGroupTourCreatePayload {
  callback(): void;
  name: Name;
  countryId: number;
  startingPrice: number;
  priceNote: PriceNote;
  priceNotIncludes: PriceNotIncludes;
  extraInformation: ExtraInformation;
  images: string[];
  description: Description2[];
  priceIncludes: PriceIncludes;
  locations: Location[];
  availableDate: AvailableDate[];
  tourItenarary: TourItinerary[];
}

export interface ILetsTripGroupTourDeletePayload {
  callback(): void;
  id: string;
}

export interface ExtraInformation {
  ru: Ru[];
  en: En[];
}

export interface Ru {
  title: string;
  value: string;
}

export interface En {
  title: string;
  value: string;
}

export interface TourItinerary {
  id?: number;
  imageUrl: string;
  description: Description[];
  title: Title;
}

export interface Description {
  id?: number;
  ru: string;
  en: string;
}

export interface Title {
  id?: number;
  ru: string;
  en: string;
}

export interface Name {
  id?: number;
  ru: string;
  en: string;
}

export interface AvailableDate {
  month: number;
  year: number;
  departures: Departure[];
}

export interface Departure {
  price: number;
  transferType: TransferType;
  startDate: string;
  endDate: string;
}

export interface TransferType {
  id?: number;
  ru: string;
  en: string;
}

export interface Description2 {
  id?: number;
  ru: string;
  en: string;
}

export interface Location {
  lng?: number;
  lat?: number;
}

export interface PriceIncludes {
  id?: number;
  ru: string[];
  en: string[];
}

export interface PriceNotIncludes {
  id?: number;
  ru: string[];
  en: string[];
}

export interface PriceNote {
  ru: string;
  en: string;
}

export interface Country {
  id: number;
  name: Name2;
  imageUrl: string;
  code: string;
  region: any[];
  deleted: boolean;
}

export interface Name2 {
  id: number;
  ru?: string;
  en?: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Sort2 {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
