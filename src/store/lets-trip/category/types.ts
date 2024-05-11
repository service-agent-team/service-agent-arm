export interface ILetsTripCategoryInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    put: boolean;
    delete: boolean;
  };
  categories: ILetsTripCategory[] | null;
  category: ILetsTripCategory | null;
  errors: unknown | string[] | string;
}

export interface ILetsTripCategory {
  id: number;
  name: string;
  parent?: Parent;
  companyId?: number;
  deleted: boolean;
}

export interface Parent {
  id: number;
  name: string;
}

export interface ILetsTripCategoryResponse {
  content: ILetsTripCategory[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort2;
  numberOfElements: number;
  empty: boolean;
}

export interface IGetOneLetsTripCategoryResponse {
  success: boolean;
  status: number;
  msg: string;
  data: ILetsTripCategory;
}

export interface ILetsTripCategoryPayload {
  callback(): void;
  page: number;
  size: number;
}

export interface ILetsTripCategoryGetOnePayload {
  callback(): void;
  id: string;
}

export interface ILetsTripCategoryCreatePayload {
  callback(): void;
  name: string;
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
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Sort2 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
