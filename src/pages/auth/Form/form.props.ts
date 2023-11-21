import { ReactNode } from "react"
import { IValues } from "../SignIn/sign-in.interface"

export interface IFormProps {
  text: string
  loader: string
  login: boolean
  onFinish: (values: IValues) => void
  children: ReactNode
}
