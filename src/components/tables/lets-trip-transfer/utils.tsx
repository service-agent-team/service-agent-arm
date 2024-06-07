import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { dateParser } from '@/common/utils/format';
import { Icon, modal } from '@/components';
import { ROUTES } from '@/constants';
import { IDirection, ILetsTripTransfer } from '@/store/lets-trip/transfer/types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

export const utils = () => {
  const {
    deleteLetsTripTransfer,
    setLetsTripTransfers,
    getOneLetsTripTransfer,
    setCarModal,
    setSelectCar,
  } = useActions();
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

  const openSettingsModal = (record: ILetsTripTransfer) => {
    setCarModal(true);
    setSelectCar(record.id);
  };

  const columns: ColumnsType<ILetsTripTransfer> = [
    {
      title: 'Id',
      dataIndex: '',
      render: (_: any, __: any, index: number) => {
        return <>{index + 1}</>;
      },
      key: 'id',
      width: '40%',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Car Name',
      dataIndex: ['name', 'en'],
      key: 'name',
      width: '50%',
    },
    {
      title: 'Car Category',
      dataIndex: ['category', 'name', 'en'],
      key: 'category',
      width: '230',
    },
    {
      title: 'Per KM Price ($)',
      dataIndex: 'pricePerKM',
      key: 'pricePerKM',
      width: '230px',
      render: (value: number) => value / 100 + ' $',
    },
    {
      title: 'Hourly Price ($)',
      dataIndex: 'hourlyPrice',
      key: 'hourlyPrice',
      width: '230px',
      render: (value: number) => value / 100 + ' $',
    },
    {
      title: 'Created At Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '230px',
      render: (date) => {
        return dateParser(date);
      },
    },
    {
      title: 'Manufacture Date',
      dataIndex: 'manufactureDate',
      key: 'manufactureDate',
      width: '230px',
    },
    // {
    //   title: 'Active',
    //   dataIndex: 'deleted',
    //   key: 'deleted',
    //   width: '5%',
    //   render: (value) =>
    //     value ? <Tag color="red">DELETED</Tag> : <Tag color="success">ACTIVE</Tag>,
    // },
    {
      title: 'Source Boundary',
      dataIndex: 'directions',
      key: 'deleted',
      width: '5%',
      render: (el: IDirection[]) =>
        el.map((el, i) => (
          <Tag key={i} color="success">
            {el.sourceBoundary.name.en}
          </Tag>
        )),
    },
    {
      title: 'Destination Boundary',
      dataIndex: 'directions',
      key: 'deleted',
      width: '5%',
      render: (el: IDirection[]) =>
        el.map((el, i) => (
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
        el.map((el, i) => (
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
        el.map((el, i) => (
          <Tag key={i} color="success">
            {el.hourlyPrice}
          </Tag>
        )),
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
      render: (_, record: ILetsTripTransfer) => {
        return (
          <Space>
            {record.deleted ? (
              'No Actions'
            ) : (
              <>
                <Button type="primary" key={1} onClick={() => openSettingsModal(record)}>
                  <Icon name="SettingOutlined" />
                </Button>
                <Button
                  type="primary"
                  key={2}
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
                <Button type="primary" danger key={3} onClick={() => handleDelete(record)}>
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
