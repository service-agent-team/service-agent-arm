export interface ILetsTripStatisticInitialState {
  loading: {
    get: boolean;
    post: boolean;
    patch: boolean;
    delete: boolean;
  };
  statistics: ILetsTripStatistic | null;
  errors: unknown | string[] | string;
}

export interface ILetsTripStatistic {
  activeUsers: number;
  inactiveUsers: number;
  gotBonusesUsers: number;
  monthlyData: MonthlyData[];
}

export interface ILetsTripStatisticResponse extends ILetsTripStatistic {}

export interface ILetsTripStatisticPayload {
  callback: () => void;
}

export interface MonthlyData {
  month: number;
  registeredUsers: number;
}
