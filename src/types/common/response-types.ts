export interface IGlobalResponse<T> {
  success: boolean;
  status: number;
  msg: string;
  data: T[] | T;
}
