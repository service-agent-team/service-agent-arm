export interface IAgentPermissionInitalState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  statistic: IOrderStatistica | null;
  errors: unknown | string[] | string;
  status: number;
}

export interface IOrderStatistica {
  all: number;
  active: number;
  process: number;
  esim: number;
  phisic: number;
  noresident: number;
  resident: number;
}

export interface IAgentOrderPay {
  start: string;
  end: string;
}
