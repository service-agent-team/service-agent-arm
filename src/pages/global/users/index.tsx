import { Table } from '@/components';
import { columns, data } from '@/constants';
import { DataType } from '@/ui/tables/table-component/table-interface';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useState } from 'react';
import * as S from './user.styled';

export const Users = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <S.userStyled>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={false}
        bordered
      />
    </S.userStyled>
  );
};
