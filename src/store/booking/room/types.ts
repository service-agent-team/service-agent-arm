import { LanguageType, RoomStatusType, RoomType } from '@/common/enum';

export interface InitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    put: boolean;
    delete: boolean;
  };
  rooms: IRoom[] | null;
  room: IRoom | null;
  lang: LanguageType;
  errors: unknown | string[] | string;
}

export interface IRoomTranslation {
  name: string;
  description: string;
  maxGuests: number;
  maxAdults: number;
  maxChildren: number;
  bathRoomType: boolean;
  size: string;
  status: string;
  propertyId: number;
  roomType: string;
  beds: Bed[];
  attachments: any[];
  facilityList: any[];
  roomCount: number;
  languageType: LanguageType;
  smockingAllowed: boolean;
}

export interface IRoom {
  id: number;
  name: string;
  description: string;
  maxGuests: number;
  maxAdults: number;
  maxChildren: number;
  bathRoomType: boolean;
  size: string;
  status: RoomStatusType;
  propertyId: number;
  roomType: RoomType;
  beds: Bed[];
  attachments: any[];
  facilityList: any[];
  roomCount: number;
  languageType: LanguageType;
  smockingAllowed: boolean;
  translations?: IRoomTranslation[];
}

export interface Bed {
  bedNumber: number;
  bedType: BedType;
}

export interface BedType {
  id: number;
  name: string;
  description: string;
  size: string;
  lang: LanguageType;
}

export interface IRoomPayload {
  page: number;
  size: number;
}

export interface IRoomTranslationBody {
  name: string;
  description: string;
  roomId: number;
  languageType: LanguageType;
}

export interface IGetOneRoomPayload {
  id: number;
}

export interface IGetByPropertyIdPayload extends IRoomPayload {
  propertyId: number;
  lang: LanguageType;
}

export interface ICreateRoomTranslationPayload {
  body: IRoomTranslationBody;
  cb(): void;
}

export interface IDeleteRoomTranslationPayload {
  id: number;
  lang: LanguageType;
  cb(): void;
}

export interface IRoomResponse<T> {
  content: T;
  count: number;
  totalCount: number;
}
