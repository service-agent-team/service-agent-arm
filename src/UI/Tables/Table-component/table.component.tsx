import { Table } from 'antd';
import type { TableProps } from 'antd/es/table';
import React from 'react';
import { DataType } from './table.interface';

export const TableComponent: React.FC<TableProps<DataType>> = (props) => {
  return <Table {...props} bordered loading={props.loading} />;
};
