import { ReactNode } from 'react';
import * as S from './styles';

interface IProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export const SimplePage = ({ children, className, title }: IProps) => {
  return (
    <S.Page className={className}>
      <S.Text>{title}</S.Text>
      {children}
    </S.Page>
  );
};
