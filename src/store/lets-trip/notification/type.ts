export interface IInitialState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  users: ILetstripUsers[];
  selected_userIds: number[];
}

export interface ILetstripUsers {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  pictureUrl: any;
  phoneNumber: string;
  countryName: string;
}
