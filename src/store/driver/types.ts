export interface IDriverinitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
  };
  driver: IDriver[] | null;
  errors: unknown | string[] | string;
}

export interface IDriver {
  carTypeId: number;
  withBaggage: boolean;
  numberOfSeats: number;
  createdAt: string;
  isDeleted: boolean;
}

export interface IDriverResponse {
  data: IDriver[];
}

export interface IDriverByIdResponse {
  data: IDriver;
}

export interface IDriverCreateResponse {}
export interface IDriverEditResponse {}
export interface IDriverEditPayload {
  phoneNumber: string;
  id: number | string;
  callback: () => void;
}

export interface IDriverCreatepayload {
  phoneNumber: string;
  callback: () => void;
}

export interface IDriverByIdPayload {
  id: number | string;
  callback: () => void;
}
