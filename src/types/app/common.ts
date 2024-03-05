export type TUploadFileResponse = {
  images: string[];
  id: number;
  createdAt: string;
};

export enum PayloadEnum {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}
