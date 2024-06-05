export interface ILetsTripTransferInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  transferCategories: ILetsTripTransferCategory[] | null;
  activeTransferCategories: ILetsTripTransferCategory[] | null;
  transferCategory: ILetsTripTransferCategory | null;
  deleted: boolean;
  errors: unknown | string[] | string;
}

export interface ILetsTripTransferCategory {
  id: number;
  startingPrice: number;
  seats: number;
  luggage: number;
  name: Name;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export interface Name {
  id?: number;
  ru: string;
  en: string;
  uz: string;
}

export interface ILetsTripTransferCategoryResponse {
  content: ILetsTripTransferCategory[];
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

export interface ILetsTripTransferCategoryPayload {
  page: number;
  size: number;
  deleted?: boolean;
}

export interface IGetOneLetsTripTransferCategoryPayload {
  callback(): void;
  categoryId: number;
}

export interface ILetsTripTransferCategoryCreatePayload {
  callback(): void;
  body: { name: Name; startingPrice: number; seats: number; luggage: number };
}

export interface ILetsTripTransferCategoryUpdatePayload {
  callback(): void;
  categoryId: number;
  body: { startingPrice: number; seats: number; luggage: number };
}

export interface ILetsTripTransferCategoryDeletePayload {
  callback(): void;
  categoryId: number;
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
