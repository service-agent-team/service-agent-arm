export interface ILetsTripTransferInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  transfers: ILetsTripTransfer[] | null;
  transfer: ILetsTripTransfer | null;
  errors: unknown | string[] | string;
}

export interface ILetsTripTransfer {
  id: number;
  name: string;
  category: Category;
  company: Company;
  description: string;
  startingPrice: number;
  sellingPrice: number;
  pictures: any[];
  currency: string;
  attributes: Attributes;
  countryCode: string;
  departures: any[];
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export interface ILetsTripTransferResponse {
  content: ILetsTripTransfer[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: any[];
  numberOfElements: number;
  empty: boolean;
}

export interface ILetsTripTransferPayload {
  callback(): void;
}

export interface ILetsTripTransferCreateResponse extends ILetsTripTransfer {}

export interface ILetsTripPayload {
  callback(): void;
}

export interface ILetsTripTransferCreatePayload {
  callback(): void;
  name: string;
  categoryId: number;
  companyId: number;
  hourly: number;
  transfer: number;
  mediaLinks: string[];
  currency: string;
  releaseDate: string;
  attributes: any;
  countryCode: string;
}

export interface Category {
  id: number;
  name: string;
  companyId: number;
}

export interface Company {
  id: number;
  name: string;
  deleted: boolean;
}

export interface Attributes {
  numberOfSeats: string;
  carName: string;
  numberOfbuggage: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
