export interface CreateCarPayload {
  name: string;
  imageGroupId: string;
  attributes: any;
}

export interface ICreateCarDirection {
  transferPrice: number;
  hourlyPrice: number;
  sourceBoundaryId: number;
  destinationBoundaryId: number;
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
