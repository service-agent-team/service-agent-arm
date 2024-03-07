export interface IAgentPermissionInitalState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  order: IAgentOrderData | null;
  orders: IAgentOrderData[] | null;
  errors: unknown | string[] | string;
  status: number;
}

export enum PayloadEnum {
  get = 'get',
  post = 'post',
  patch = 'patch',
  delete = 'delete',
}

export interface IAgentOrderData {
  id: number;
  userId: number;
  serviceOrderId: number;
  isEsim: boolean;
  isResident: boolean;
  productId: number;
  createdAt: string;
  order: Order;
}

export interface Order {
  ServiceOrderId: number;
  OrderDate: string;
  OrderState: number;
  OrderStateName: string;
  ParentDepartmentName: string;
  DepartmentName: string;
  CustomerName: string;
  TariffPlanName: string;
  PhoneNumber: string;
  IsESIM: boolean;
  SIMCardICC: string;
  Username: string;
  UserDescription: string;
  PaymentsAmount: string;
}

export interface IAgentOrderPay {
  start: string;
  end: string;
  status: number;
}
