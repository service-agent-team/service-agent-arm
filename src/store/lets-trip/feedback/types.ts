import { IPagination } from '@/common';

export enum FeedbackStateType {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  REJECTED = 'REJECTED',
}

export enum FeedbackType {
  HOTEL = 'HOTEL',
  TOUR = 'TOUR',
  TRANSFER = 'TRANSFER',
  FLIGHT = 'FLIGHT',
}

export interface InitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    put: boolean;
    delete: boolean;
  };
  feedbacks: IFeedback[] | null;
  feedback: IFeedback | null;
  type: FeedbackType;
  state: FeedbackStateType;
  modal: { name: 'filter' | 'confirm'; data: boolean };
  errors: unknown | string[] | string;
}

export interface IFeedback {
  id: number;
  login: string;
  fullName: string;
  title: string;
  star: number;
  state: string;
  productId: number;
  type: string;
  pictureURL: string;
  createdAt: string;
}

export interface IFeedbackPayload {
  type: FeedbackType;
  state: FeedbackStateType;
  page: number;
  size: number;
}

export interface IFeedbackChangePayload {
  id: number;
  cb(): void;
}

export interface IResponse<T> {
  content: T;
  pageable: IPagination;
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

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}
