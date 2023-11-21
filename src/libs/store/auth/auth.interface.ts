export interface InitialState {
  user: any | null
  token: string | null
  isAuth: boolean
  loading: {
    sign: boolean
  }
  error: null | string | unknown
}