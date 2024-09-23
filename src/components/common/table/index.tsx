import { TableProps } from 'antd';
import { Header } from './header';
import * as S from './styles';
import './table.scss';
import type { TTable } from './type';

export const Table = ({ isAdd, select, path, ...props }: TableProps<any> & Partial<TTable>) => {
  return (
    <S.Table
      bordered
      {...props}
      scroll={{ x: 'max-content' }}
      style={{ width: '100%' }}
      title={() => <Header isAdd={isAdd} select={select} path={path} />}
    />
  );
};
