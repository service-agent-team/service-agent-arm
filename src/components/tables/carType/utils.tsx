import { addNotification } from '@/common/utils/addNotification';
import { modal } from '@/components/app';
import { useActions } from '@/hooks';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { UserTableRow } from './types';

export const utils = () => {
  const navigate = useNavigate();
  const { deletCarType, getCarType, getOneCarType } = useActions();

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: `Delete`,
      title: `You want to delete right ?`,
      onOk: () => {
        deletCarType({
          id: record.carTypeId,
          callback: () => {
            getCarType({ callback: () => {}, page: 0, size: 100 });
            addNotification('Deleted.');
            return 'ok';
          },
        });
      },
    });
  };

  const columns: ColumnsType<UserTableRow> = [
    {
      title: 'Id',
      dataIndex: 'carTypeId',
      key: 'carTypeId',
      width: '10%',
      sorter: (a, b) => a.carTypeId - b.carTypeId,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Number Of Seats',
      dataIndex: 'numberOfSeats',
      key: 'numberOfSeats',
      width: '20%',
      sorter: (a, b) => a.numberOfSeats - b.numberOfSeats,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '20%',
      render: (_, { createdAt }) => {
        return (
          <Tag>{`${new Date(createdAt).getDate()}-${new Date(createdAt).getMonth()}-${new Date(
            createdAt,
          ).getFullYear()}`}</Tag>
        );
      },
    },
    {
      title: 'Number Of Baggages',
      dataIndex: 'numberOfBaggages',
      key: 'numberOfBaggages',
      width: '20%',
      render: (_, { numberOfBaggages }) => {
        return <Tag color={'green'}>{numberOfBaggages}</Tag>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_: any, record: any) => {
        return (
          <Space>
            <Button
              key={1}
              onClick={() => {
                getOneCarType({
                  id: record.carTypeId,
                  callback: () => {
                    navigate(`/transfer/car-type/edit/${record.carTypeId}`);
                  },
                });
              }}
            >
              <EditOutlined />
            </Button>
            <Button key={2} onClick={() => handleDelete(record)}>
              <DeleteOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];

  return columns;
};
