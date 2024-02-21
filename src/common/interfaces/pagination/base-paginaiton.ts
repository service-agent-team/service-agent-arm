import { Pageable, Sort2 } from '../transfer/base-response';

export interface IPagination {
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort2;
  first: boolean;
  empty: boolean;
}
