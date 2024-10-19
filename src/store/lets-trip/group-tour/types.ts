import { IStoreLoadings } from '@/types/app/common';
import { Pageable, Sort } from '@/types/response';

export interface ILetsTripGroupTourInitialState {
  loading: IStoreLoadings;
  groupTour: ILetsTripGroupTourGetOne | null;
  groupTourRaw: ILetsTripGroupTour | null;
  activeTours: ILetsTripGroupTour[] | null;
  byCountryIdTours: ILetsTripGroupTour[] | null;
  searchGroupTours: ILetsTripGroupTour[] | null;
  locations: Location2[];
  errors: unknown | string[] | string;
  deleted: boolean;
  itenararyItem: TourItinerary | null;
}

export interface ILetsTripGroupTour {
  tourId: number;
  extraInformation: ExtraInformation;
  tourItenarary: TourItinerary[];
  images: string[];
  media: IMedia[];
  prices?: IPrices;
  price: number;
  oldPrice: number;
  upTo2: number;
  upTo4: number;
  upTo6: number;
  upTo10: number;
  oldUpTo2: number;
  oldUpTo4: number;
  oldUpTo6: number;
  oldUpTo10: number;
  name: Name;
  availableDate: AvailableDate[];
  description: Description2[];
  locations: Location[];
  priceIncludes: PriceIncludes;
  priceNotIncludes: PriceNotIncludes;
  priceNote: PriceNote;
  countryId: number;
  deleted?: boolean;
  createdAt?: string;
  cityName: Name;
  freeCancellation: IFreeCancellation;
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
  sort: Sort;
  first: boolean;
  empty: boolean;
}

export interface ILetsTripGroupTourByCountryIdPayload {
  countryId: number;
  page: number;
  size: number;
}

export interface ILetsTripGroupTourSearchPayload {
  countryId: number;
  page: number;
  size: number;
  name: string;
}

export interface IGetOneLetsTripTourResponse extends ILetsTripGroupTourGetOne {}
export interface IGetOneRawLetsTripTourResponse extends ILetsTripGroupTour {}

export interface ILetsTripGroupTourCreateResponse extends ILetsTripGroupTour {}

export interface ILetsTripGroupTourPayload {
  callback(): void;
  page: number;
  size: number;
}

export interface ILetsTripGroupTourGetOnePayload {
  id: string;
  callback?(): void;
}

export interface IFreeCancellation {
  day: number;
  hour: number;
}

export interface IMedia {
  priority: number;
  url: string;
  mediaType: MediaType;
}

export interface ILetsTripGroupTourCreatePayload {
  callback(): void;
  name: Name;
  countryId: number;
  prices?: IPrices;
  price?: number;
  oldPrice?: number;
  upTo2?: number;
  upTo4?: number;
  upTo6?: number;
  upTo10?: number;
  oldUpTo2?: number;
  oldUpTo4?: number;
  oldUpTo6?: number;
  oldUpTo10?: number;
  priceNote: PriceNote;
  priceNotIncludes: PriceNotIncludes;
  extraInformation: ExtraInformation;
  images?: string[];
  media: IMedia[];
  description: Description2[];
  priceIncludes: PriceIncludes;
  locations: Location[];
  // availableDate: AvailableDate[];
  tourItenarary: TourItinerary[];
  cityName: Name;
  freeCancellation: IFreeCancellation;
}

export interface UpdateByObject {
  id: number;
  en: string;
  ru: string;
}

export interface UpdatePriceIncludes {
  en: string[];
  ru: string[];
}

export interface UpdatePriceIncludesPayload extends UpdatePriceIncludes {
  callback(): void;
  id: number;
}

export interface ILetsTripTourUpdateByObjectPayload extends UpdateByObject {
  callback(): void;
  id: number;
}

export interface ILetsTripGroupTourAddNewMonthPayload {
  tourId: number;
  availableDateItem: AvailableDate;
  callback(): void;
}

export interface ILetsTripGroupTourRemoveMonthPayload {
  tourId: number;
  availableDateItemId: number;
  callback(): void;
}

export interface ILetsTripGroupTourAddLocationPayload {
  lng: number;
  lat: number;
  tourId: number;
  callback(): void;
}

export interface ILetsTripGroupTourRemoveLocationPayload {
  tourId: number;
  locationItemId: number;
  callback(): void;
}

export interface IAddMediaPayload {
  tourId: number;
  media: IMedia;
  cb?(): void;
}

export interface IDeleteMediaPayload {
  mediaId: number;
  cb?(): void;
}

export interface ILetsTripGroupTourImagePayload {
  tourId: number;
  images: string[];
  callback(): void;
}

export interface ILetsTripGroupTourOtherUpdatesPayload {
  tourId: number;
  countryId: number;
  prices?: IPrices;
  price?: number;
  oldPrice?: number;
  upTo2?: number;
  upTo4?: number;
  upTo6?: number;
  upTo10?: number;
  oldUpTo2?: number;
  oldUpTo4?: number;
  oldUpTo6?: number;
  oldUpTo10?: number;
  freeCancellation: IFreeCancellation;
  callback(): void;
}

export interface ILetsTripGroupTourAddExtraInfoPayload {
  tourId: number;
  items: En[];
  lang: Lang;
  callback(): void;
}

export interface ILetsTripGroupTourAddExtraInfoAllPayload {
  tourId: number;
  en: En[];
  ru: Ru[];
  callback(): void;
}

export interface ILetsTripGroupTourRemoveExtraInfoPayload {
  tourId: number;
  extraInfoId: number;
  lang: string;
  callback(): void;
}

export interface ItenararyBody {
  imageUrl: string;
  descriptions: Description[];
  title: Title;
  item_order: number;
}

export interface ILetsTripGroupTourItenararyUpdatePayload {
  tourId: number;
  tourItenararyId: number;
  body: ItenararyBody;
  callback?(): void;
}

export interface ILetsTripGroupTourAddItenararyPayload {
  tourId: number;
  body: {
    imageUrl: string;
    description: Description[];
    title: Title;
    item_order: number;
  };
  callback(): void;
}

export interface ILetsTripGroupTourRemoveItenararyPayload {
  tourId: number;
  tourItenararyItemId: number;
  callback(): void;
}

export interface ILetsTripGroupTourDeletePayload {
  callback(): void;
  id: string;
}

export interface ExtraInformation {
  id?: number;
  ru: Ru[];
  en: En[];
}

export interface Ru {
  id?: number;
  title: string;
  value: string;
}

export interface En {
  id?: number;
  title: string;
  value: string;
}

export interface TourItinerary {
  id?: number;
  imageUrl: string;
  description: Description[];
  descriptions?: Description[];
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
  id?: number;
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
  id?: number;
  ru: string;
  en: string;
}

export interface Country {
  id: number;
  name: Name;
  imageUrl: string;
  code: string;
  region: any[];
  deleted: boolean;
}

export interface ILetsTripGroupTourGetOne {
  priceNotIncludes: string[];
  extraInformation: ExtraInformation2[];
  images: string[];
  priceNote: string;
  price: number;
  oldPrice: number;
  upTo2: number;
  upTo4: number;
  upTo6: number;
  upTo10: number;
  oldUpTo2: number;
  oldUpTo4: number;
  oldUpTo6: number;
  oldUpTo10: number;
  tourId: number;
  name: string;
  tourItenarary: TourItenarary2[];
  description: string[];
  priceIncludes: string[];
  availableDate: AvailableDate2[];
  locations: Location2[];
  cityName: Name;
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
  id?: number;
  lng: number;
  lat: number;
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

export enum Lang {
  En = 'EN',
  Ru = 'RU',
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export interface IPrices {
  childPrices: ChildPrice[];
  adultPrices: AdultPrice[];
}

export interface ChildPrice {
  maxAge: number;
  price: number;
}

export interface AdultPrice {
  from: number;
  price: number;
  oldPrice: number;
}
