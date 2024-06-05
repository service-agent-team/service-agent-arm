import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { LinkButton } from '@/components/common/buttons';
import { dateParser } from '@/common/utils/format';
import { ILetsTripTransfer } from '@/store/lets-trip/transfer/types';
import { modal } from '@/components';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { ROUTES } from '@/constants';
import { useNavigate } from 'react-router-dom';

export const utils = () => {
  const { deleteLetsTripTransfer, setLetsTripTransfers, getOneLetsTripTransfer } = useActions();
  const { transfers } = useTypedSelector((state) => state.letsTripTransfer);
  const navigate = useNavigate();

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: `${record.isDeleted ? 'Enable' : 'Delete'}`,
      title: `You want to delete right ?`,
      onOk: () => {
        deleteLetsTripTransfer({
          callback() {
            setLetsTripTransfers(transfers?.filter((t) => t.id !== record.id));
            addNotification('successfully deleted transfer');
          },
          carId: record.id,
        });
      },
    });
  };

  const columns: ColumnsType<ILetsTripTransfer> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Car Name',
      dataIndex: ['name', 'en'],
      key: 'name',
      width: '20%',
    },
    {
      title: 'Car Category',
      dataIndex: ['category', 'name', 'en'],
      key: 'category',
      width: '20%',
    },
    {
      title: 'Per KM Price ($)',
      dataIndex: 'pricePerKM',
      key: 'pricePerKM',
      width: '15%',
      render: (value: number) => value / 100 + ' $',
    },
    {
      title: 'Hourly Price ($)',
      dataIndex: 'hourlyPrice',
      key: 'hourlyPrice',
      width: '10%',
      render: (value: number) => value / 100 + ' $',
    },
    {
      title: 'Created At Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '25%',
      render: (date) => {
        return dateParser(date);
      },
    },
    {
      title: 'Manufacture Date',
      dataIndex: 'manufactureDate',
      key: 'manufactureDate',
      width: '25%',
    },
    {
      title: 'Active',
      dataIndex: 'deleted',
      key: 'deleted',
      width: '5%',
      render: (value) =>
        value ? <Tag color="red">DELETED</Tag> : <Tag color="success">ACTIVE</Tag>,
    },
    // {
    //   title: 'View',
    //   dataIndex: 'id',
    //   key: 'view',
    //   width: '10%',
    //   render: (_: number) => {
    //     return (
    //       <LinkButton path={`#`}>
    //         <EyeOutlined />
    //       </LinkButton>
    //     );
    //   },
    // },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_, record: any) => {
        return (
          <Space>
            {record.deleted ? (
              'No Actions'
            ) : (
              <>
                <Button
                  type="primary"
                  key={1}
                  onClick={() => {
                    getOneLetsTripTransfer({
                      callback() {
                        navigate(`${ROUTES.letsTripTransfer}/edit/${record.id}`);
                      },
                      carId: record.id,
                    });
                  }}
                >
                  <EditOutlined />
                </Button>
                <Button type="primary" danger key={2} onClick={() => handleDelete(record)}>
                  <DeleteOutlined />
                </Button>
              </>
            )}
          </Space>
        );
      },
    },
  ];

  return columns;
};
