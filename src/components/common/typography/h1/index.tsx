import React from 'react';
import { HProps } from '../types';
import * as S from './styles';

export const H1: React.FC<HProps> = ({ className, children }) => (
  <S.Text className={className}>{children}</S.Text>
);
