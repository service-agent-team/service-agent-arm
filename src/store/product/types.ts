export interface IProductInitalState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  products: IProduct[];
  product: IProduct | unknown;
  errors: unknown | string[] | string;
}

export enum PayloadEnum {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}

export interface IProductResponse {
  success: boolean;
  status: number;
  msg: string;
  data: IProduct[];
}

export interface IProduct {
  id: number;
  name: string;
  category: Category;
  company: Company;
  description: string;
  startingPrice: number;
  sellingPrice: number;
  discountPrice: number;
  currency: string;
  attributes: object;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
  deleted: boolean;
}

export interface IProductPayload {
  categoryId: number;
  page: number;
  size: number;
  callback: () => void;
}
