import { ReactNode } from "react"

export interface IBtnProps {
  type?: any
  btn: boolean
  children: ReactNode
  className: string
  loading: boolean
  htmlType: any
}
