export interface ICarModel {
  modelId: number;
  name: string;
  imageGroupId: string;
  images: string[];
  attributes: any;
  createdAt: string;
}

export interface ImageSet {
  groupId: string;
}