import { AxiosResponse } from 'axios';

export interface ICompanyResponse extends AxiosResponse {
  data: ICompany[] | ICompany;
}

export interface ICarTypeInitalState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  companies: ICompany[] | null;
  company: ICompany | null;
  errors: unknown | string[] | string;
}

export interface ICompanyPayload {
  page: number;
  size: number;
}

export interface ICompany {
  id: number;
  name: string;
  deleted: boolean;
}
