import { ReactNode } from 'react';
import * as S from './style';

export interface IProps {
  path: string;
  children: ReactNode;
}

export const LinkButton = ({ path, children }: IProps) => {
  return <S.Navigate to={path}>{children}</S.Navigate>;
};
