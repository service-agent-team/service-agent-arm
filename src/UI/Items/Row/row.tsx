/* eslint-disable prettier/prettier */
import { Row } from 'antd';
import { ReactNode } from 'react';
type IProps = {
  children: ReactNode;
};
export const Rows = ({ children }: IProps) => {
  return <Row>{children}</Row>;
};
