export interface IStatisticaResponce {
  message: string;
  success: boolean;
  data: IStatistica[];
}

export interface IStatistica {
  year: number;
  success: number[];
  reject: number[];
  client_canceled: number[];
  driver_canceled: number[];
  driver_accepted: number[];
  order_canceled: number[];
  client_not_accepted: number[];
  send_reason: number[];
}

export interface IDriverinitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
  };
  statistica: IStatistica | null;
  errors: unknown | string[] | string;
}
