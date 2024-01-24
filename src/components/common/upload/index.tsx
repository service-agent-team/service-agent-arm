import { UploadProps } from 'antd';
import * as S from './styled.ts';
import React from 'react';

export const Upload: React.FC<UploadProps> = (props) => {
  return <S.Upload {...props} />;
};
