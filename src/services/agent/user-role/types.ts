export interface ICreateParam {
  userId: number;
  roleId: number;
}

export interface IUpdateParam {
  id: number | string;
  userId: number;
  roleId: number;
}

export interface IDeleteParam {
  id: number | string;
}
