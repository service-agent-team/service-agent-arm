export enum LetsTripOrderStatus {
  DELIVERED = 'DELIVERED',
  CREATED = 'CREATED',
  DELETED = 'DELETED',
  CANCELED = 'CANCELED',
  ADMIN_CONFIRMED_CANCELED = 'ADMIN_CONFIRMED_CANCELED',
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
  HOTEL = 'HOTEL',
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

export interface ILetsTripHotelOrder {
  id: string;
  userId: number;
  agentId: any;
  status: string;
  type: string;
  details: Details;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Details {
  email: string;
  rooms: Room[];
  checkIn: string;
  country: string;
  dmcType: string;
  hotelId: number;
  bookHash: string;
  checkOut: string;
  latitude: number;
  roomName: string;
  hotelName: string;
  languages: string;
  longitude: number;
  phoneNumber: string;
  partnerOrderId: any;
  paymentOptions: PaymentOptions;
}

export interface Room {
  guests: Guest[];
  roomNumber: number;
}

export interface Guest {
  age?: number;
  isChild: boolean;
  lastName: string;
  firstName: string;
}

export interface PaymentOptions {
  taxData: TaxData;
  vatData: VatData;
  totalPrice: number;
  currencyCode: string;
  increasePercentage: number;
}

export interface TaxData {
  taxes: Tax[];
}

export interface Tax {
  name: string;
  amount: string;
  currencyCode: string;
  includedBySupplier: boolean;
}

export interface VatData {
  amount: string;
  applied: boolean;
  included: boolean;
  currencyCode: string;
}
