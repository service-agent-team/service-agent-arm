export interface ILetsTripOrder {
  id: number;
  userId: number;
  serviceOrderId: number;
  price: number;
  productId: number;
  status: LetsTripOrderStatus;
  createdAt: string;
}

export enum LetsTripOrderStatus {
  all = 'all',
  active = 'active',
  pending = 'pending',
  rejected = 'rejected',
}

export interface ILetsTripOrderInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  orders: ILetsTripOrder[] | null;
  status: LetsTripOrderStatus;
  errors: unknown | string[] | string;
}

export interface IGetLetsTripOrderPayload {
  tarifid: number;
  carId: number;
  carTypeId: number;
  price: number;
  callback: () => void;
}
