import React from 'react';
import { HProps } from '../types';
import * as S from './styles';

export const H1: React.FC<HProps> = ({ className, children, isHtml }) => {
  if (isHtml)
    return <div className={className} dangerouslySetInnerHTML={{ __html: children as string }} />;

  return <S.Text className={className}>{children}</S.Text>;
};
