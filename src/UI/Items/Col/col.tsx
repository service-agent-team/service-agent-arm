/* eslint-disable prettier/prettier */
import { Col } from "antd";
import { ReactNode } from 'react';
type IProps = {
    span: number | string,
    children: ReactNode
}
export const Cols = ({ span, children }: IProps) => {
    return (<Col span={span}>{children}</Col>)
}