import { ILetsTripTransfer } from '@/store/lets-trip/transfer/types';
import { ColumnsType } from 'antd/es/table';
import { Actions } from './actions';

export const utils = () => {
  const columns: ColumnsType<ILetsTripTransfer> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Car Name',
      dataIndex: ['name', 'en'],
      key: 'name',
      width: '25%',
    },
    {
      title: 'Car Category',
      dataIndex: ['category', 'name', 'en'],
      key: 'category',
      width: '230px',
    },
    {
      title: 'Manufacture Date',
      dataIndex: 'manufactureDate',
      key: 'manufactureDate',
      width: '130px',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_, record: ILetsTripTransfer) => <Actions record={record} />,
    },
  ];

  return columns;
};
