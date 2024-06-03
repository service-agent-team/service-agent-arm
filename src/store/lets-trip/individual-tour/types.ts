export interface ILetsTripIndividualTourInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  individualTours: ILetsTripIndividualTour[] | null;
  individualTourRaw: ILetsTripIndividualTour | null;
  individualTour: ILetsTripIndividualTourGetOne | null;
  activeIndividualTours: ILetsTripIndividualTour[] | null;
  deleted: boolean;
  errors: unknown | string[] | string;
}

export interface ILetsTripIndividualTour {
  id: number;
  duration: Duration;
  tourItenarary: TourItenarary[];
  images: string[];
  videoUrl: string;
  startingPrice: number;
  name: Name;
  description: Description2[];
  tourPrices: TourPrice[];
  priceNote: PriceNote;
  country: Country;
  deleted: boolean;
  createdAt: string;
}

export interface ILetsTripIndividualTourResponse {
  content: ILetsTripIndividualTour[];
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

export interface IGetOneLetsTripTourResponse extends ILetsTripIndividualTourGetOne {}

export interface ILetsTripIndividualTourCreateResponse extends ILetsTripIndividualTour {}

export interface ILetsTripIndividualTourPayload {
  callback(): void;
  page: number;
  size: number;
}

export interface ILetsTripIndividualTourGetOnePayload {
  callback(): void;
  id: string;
}

export interface ILetsTripIndividualTourImagePayload {
  tourId: number;
  images: string[];
  callback(): void;
}

export interface ILetsTripIndividualAddPricePayload {
  callback(): void;
  tourId: number;
  price: number;
  upToPersons: number;
  description: Description;
}

export interface ILetsTripIndividualRemovePricePayload {
  callback(): void;
  tourId: number;
  tourPriceId: number;
}

export interface ILetsTripIndividualAddItenararyPayload {
  callback(): void;
  tourId: number;
  body: {
    imageUrl: string;
    description: Description[];
    hour: string;
    title: Title;
  };
}

export interface ILetsTripIndividualRemoveItenararyPayload {
  callback(): void;
  tourId: number;
  tourItenararyItemId: number;
}

export interface ILetsTripIndividualOtherUpdatesPayload {
  callback(): void;
  tourId: number;
  body: {
    startingPrice: number;
    countryId: number;
    videoUrl: string;
  };
}

export interface ILetsTripGIndividualTourCreatePayload {
  callback(): void;
  duration: Duration;
  images: string[];
  priceNote: PriceNote;
  videoUrl: string;
  name: Name;
  tourItenarary: TourItenarary[];
  description: Description2[];
  startingPrice: number;
  tourPrices: TourPrice[];
  countryId: number;
}

export interface ILetsTripGIndividualTourDeletePayload {
  callback(): void;
  id: string;
}

export interface Duration {
  id?: number;
  ru: string;
  en: string;
}

export interface TourItenarary {
  id?: number;
  imageUrl: string;
  description: Description[];
  title: Title;
  hour: string;
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

export interface Description2 {
  id?: number;
  ru: string;
  en: string;
}

export interface TourPrice {
  id?: number;
  price: number;
  upToPersons: number;
  description: Description3;
}

export interface Description3 {
  id?: number;
  ru: string;
  en: string;
}

export interface PriceNote {
  id?: number;
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
  id?: number;
  ru: string;
  en: string;
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

export interface ILetsTripIndividualTourGetOne {
  id: number;
  duration: string;
  images: string[];
  priceNote: string;
  videoUrl: string;
  name: string;
  tourItenarary: TourItenarary2[];
  description: string[];
  startingPrice: number;
  tourPrices: TourPrice2[];
}

export interface TourItenarary2 {
  imageUrl: string;
  description: string[];
  title: string;
}

export interface TourPrice2 {
  id: number;
  price: number;
  description: string;
  upToPersons: number;
}
