import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { dateParser } from '@/common/utils/format';
import { Icon, modal } from '@/components';
import { ROUTES } from '@/constants';
import { ILetsTripTransferCategory } from '@/store/lets-trip/transfer-category/types';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

export const utils = () => {
  const {
    deleteLetsTripTransferCategory,
    setLetsTripTransfersCategories,
    setLetsTripTransferSelectCategoryId,
  } = useActions();
  const { transferCategories } = useTypedSelector((state) => state.letsTripTransferCategory);
  const navigate = useNavigate();

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: 'Delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteLetsTripTransferCategory({
          callback() {
            setLetsTripTransfersCategories(transferCategories?.filter((t) => t.id !== record.id));
            addNotification('successfully deleted transfer category');
          },
          categoryId: record.id,
        });
      },
    });
  };

  const columns: ColumnsType<ILetsTripTransferCategory> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      render: (_: any, __: any, index: number) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: 'Category Name',
      dataIndex: ['name', 'en'],
      key: 'name',
      width: '25%',
    },
    {
      title: 'Starting Price ($)',
      dataIndex: 'startingPrice',
      key: 'startingPrice',
      width: '10%',
      render: (value) => value / 100 + ' $',
    },
    {
      title: 'Seats',
      dataIndex: 'seats',
      key: 'seats',
      width: '10%',
    },
    {
      title: 'Luggage',
      dataIndex: 'luggage',
      key: 'luggage',
      width: '10%',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'name',
      width: '5%',
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
      title: 'View',
      dataIndex: 'id',
      key: 'view',
      width: '5%',
      render: (id: number, record) => {
        return (
          <Button
            onClick={() => {
              navigate(`${ROUTES.letsTripTransferCategory}/${id}`);
              setLetsTripTransferSelectCategoryId(record);
            }}
          >
            <Icon name="EyeOutlined" />
          </Button>
        );
      },
    },
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
                    navigate(`${ROUTES.letsTripTransferCategory}/edit/${record.id}`);
                  }}
                >
                  <Icon name="EditOutlined" />
                </Button>
                <Button type="primary" danger key={2} onClick={() => handleDelete(record)}>
                  <Icon name="DeleteOutlined" />
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
