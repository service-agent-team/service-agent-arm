import { ILetsTripGroupTour } from '../group-tour/types';

export enum LetsTripOrderStatus {
  DELIVERED = 'DELIVERED',
  CREATED = 'CREATED',
  DELETED = 'DELETED',
  CANCELED = 'CANCELED',
  ON_THE_WAY = 'ON_THE_WAY',
  CONFIRMED = 'CONFIRMED',
  DRAFT = 'DRAFT',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum LetsTripOrderType {
  TOUR = 'TOUR',
  TRANSFER = 'TRANSFER',
  LUGGAGE = 'LUGGAGE',
  SIM_CARD = 'SIM_CARD',
  PROPERTY = 'PROPERTY',
}

export interface ILetsTripOrderInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  orders: ILetsTripOrder[] | null;
  order: ILetsTripOrder | null;
  status: LetsTripOrderStatus;
  type: LetsTripOrderType;
  errors: unknown | string[] | string;
}

export interface ILetsTripOrderResponse {
  content: ILetsTripOrder[];
  count: number;
}

export interface ILetTripOrderPayload {
  status: LetsTripOrderStatus;
  type: LetsTripOrderType;
  page: number;
  size: number;
}

export interface ILetsTripOrder {
  id: number;
  userId: number;
  agentId: number;
  status: string;
  type: string;
  details: any;
  price: number;
  createdAt: string;
  updatedAt: string;
}
