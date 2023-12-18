import React from 'react';
import { PProps } from '../types';
import * as S from './styles';

export const P1: React.FC<PProps> = ({ className, children }) => (
  <S.Text className={className}>{children}</S.Text>
);
