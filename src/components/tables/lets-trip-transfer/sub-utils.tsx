import { useTypedSelector } from '@/common/hooks';
// import { Table } from '@/components/common';
import { IDirection, ILetsTripTransfer } from '@/store/lets-trip/transfer/types';
import { TableColumnsType, Tag, Table } from 'antd';
// import { ColumnsType } from 'antd/es/table';
import React from 'react';

export const subUtils = (dataSource: ILetsTripTransfer[]): React.ReactNode => {
  // const { activeTransfers, transfers, deleted } = useTypedSelector(
  //   (state) => state.letsTripTransfer,
  // );
  const columns: TableColumnsType<ILetsTripTransfer> = [
    {
      title: 'Source Boundry',
      dataIndex: 'directions',
      key: 'deleted',
      width: '5%',
      render: (el: IDirection[]) =>
        el?.map((el, i) => (
          <Tag key={i} color="success">
            {el.sourceBoundary.name.en}
          </Tag>
        )),
    },
    {
      title: 'Destination Boundry',
      dataIndex: 'directions',
      key: 'deleted',
      width: '5%',
      render: (el: IDirection[]) =>
        el?.map((el, i) => (
          <Tag key={i} color="red">
            {el.destinationBoundary.name.en}
          </Tag>
        )),
    },

    {
      title: 'Transfer Price',
      dataIndex: 'directions',
      key: 'deleted',
      width: '5%',
      render: (el: IDirection[]) =>
        el?.map((el, i) => (
          <Tag key={i} color="success">
            {el.transferPrice}
          </Tag>
        )),
    },
    {
      title: 'Hourly Price',
      dataIndex: 'directions',
      key: 'deleted',
      width: '5%',
      render: (el: IDirection[]) =>
        el?.map((el, i) => (
          <Tag key={i} color="success">
            {el.hourlyPrice}
          </Tag>
        )),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};
