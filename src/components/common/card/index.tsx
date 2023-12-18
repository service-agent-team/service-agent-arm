import { ReactNode } from 'react';
import * as S from './styles';

export interface IProps {
  className?: string | undefined;
  width: string;
  padding?: string;
  children: ReactNode;
  opasity?: string;
  color?: string;
}

export function Card({ className, width, children, padding, opasity, color, ...props }: IProps) {
  return (
    <S.Card
      className={className}
      $with={width}
      $padding={padding}
      {...props}
      $opasity={opasity}
      $color={color}
    >
      {children}
    </S.Card>
  );
}
