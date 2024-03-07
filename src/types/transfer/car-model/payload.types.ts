export interface CreateCarPayload {
  name: string;
  imageGroupId: string;
  attributes: any;
}

export interface ISetImagePayload {
  data: any;
  callback: () => void;
}

export interface ICreateCarModelPayload {
  data: {
    name: string;
    imageGroupId: string;
    attributes: any;
  };
  callback: () => void;
}
