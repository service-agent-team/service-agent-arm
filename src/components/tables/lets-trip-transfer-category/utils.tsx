import { ILetsTripTransferCategory } from '@/store/lets-trip/transfer-category/types';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { LinkButton } from '@/components/common/buttons';
import { dateParser } from '@/common/utils/format';
import { modal } from '@/components';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { ROUTES } from '@/constants';
import { useNavigate } from 'react-router-dom';

export const utils = () => {
  const {
    deleteLetsTripTransferCategory,
    setLetsTripTransfersCategories,
    getOneLetsTripTransferCategory,
  } = useActions();
  const { transferCategories } = useTypedSelector((state) => state.letsTripTransferCategory);
  const navigate = useNavigate();

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: `${record.isDeleted ? 'Enable' : 'Delete'}`,
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
      title: 'Active',
      dataIndex: 'deleted',
      key: 'deleted',
      width: '10%',
      render: (value) =>
        value ? <Tag color="red">DELETED</Tag> : <Tag color="success">ACTIVE</Tag>,
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
                    getOneLetsTripTransferCategory({
                      callback() {
                        navigate(`${ROUTES.letsTripTransferCategory}/edit/${record.id}`);
                      },
                      categoryId: record.id,
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
