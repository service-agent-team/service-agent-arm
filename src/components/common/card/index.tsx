import { ReactNode } from 'react';
import * as S from './styles';

export interface IProps {
  className?: string | undefined;
  width: string;
  height?: string;
  padding?: string;
  children: ReactNode;
  opasity?: string;
  color?: string;
}

export function Card({
  className,
  width,
  height,
  children,
  padding,
  opasity,
  color,
  ...props
}: IProps) {
  return (
    <S.Card
      className={className}
      $with={width}
      $height={height}
      $padding={padding}
      {...props}
      $opasity={opasity}
      $color={color}
    >
      {children}
    </S.Card>
  );
}
