import { TableProps } from 'antd';
import React from 'react';
import * as S from './styles';
import './table.scss';

// TODO make generic!
export const Table: React.FC<TableProps<any>> = (props) => {
  return <S.Table bordered {...props} scroll={{ x: 'max-content' }} style={{ width: '100%' }} />;
};
