export interface IInitialState {
  loading: {
    get: boolean;
    post: boolean;
    put: boolean;
    delete: boolean;
  };
  users: ILetstripUsers[];
  selected_userIds: number[];
  templates: INotificationTemplate[] | null;
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

export interface INotificationTemplate {
  id: number;
  name: string;
  channel: string;
  subject: IBody;
  body: IBody;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISendMessageResponse {
  successCount: number;
  failedCount: number;
}

export interface IMultiTemplateSendMessagePayload {
  templateId: number;
  languageCode: string;
  templateData: object;
  firebaseData: object;
  userIds: number[];

  cb(): void;
}
export interface IBody {
  en: string;
  ru: string;
  uz: string;
}
