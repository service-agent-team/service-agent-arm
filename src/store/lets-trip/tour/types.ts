export interface ILetsTripGroupTourInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  groupTours: ILetsTripGroupTour[] | null;
  groupTour: ILetsTripGroupTourGetOne | null;
  activeTours: ILetsTripGroupTour[] | null;
  errors: unknown | string[] | string;
  deleted: boolean;
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

export interface IGetOneLetsTripTourResponse extends ILetsTripGroupTourGetOne {}

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
  item_order: number;
}

export interface Description {
  id?: number;
  items: Items[];
  item_order: number;
  hour: string;
}

export interface Items {
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

export interface ILetsTripGroupTourGetOne {
  priceNotIncludes: string[];
  extraInformation: ExtraInformation2[];
  images: string[];
  priceNote: string;
  tourId: number;
  name: string;
  tourItenarary: TourItenarary2[];
  description: string[];
  priceIncludes: string[];
  availableDate: AvailableDate2[];
  locations: Location2[];
  startingPrice: number;
}
export interface AvailableDate2 {
  id: number;
  month: string;
  year: number;
  departures: Departure2[];
}

export interface Departure2 {
  id: number;
  endDate: string;
  price: number;
  transferType: string;
  startDate: string;
}

export interface ExtraInformation2 {
  title: string;
  value: string;
}

export interface Location2 {
  lng: null;
  lat: null;
}

export interface TourItenarary2 {
  imageUrl: string;
  description: Items2[];
  title: string;
}

export interface Items2 {
  items: string[];
  hour: string;
}
