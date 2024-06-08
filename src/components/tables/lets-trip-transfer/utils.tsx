import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { dateParser } from '@/common/utils/format';
import { Icon, modal } from '@/components';
import { ROUTES } from '@/constants';
import { IDirection, ILetsTripTransfer } from '@/store/lets-trip/transfer/types';
import { Button, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

export const utils = () => {
  const { deleteLetsTripTransfer, setLetsTripTransfers, setCarModal, setSelectCar } = useActions();
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
      dataIndex: 'id',
      render: (_: any, __: any, index: number) => {
        return <>{index + 1}</>;
      },
      key: 'id',
      width: '4%',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
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
      width: '130px',
    },
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
            {el.transferPrice / 100 + ' $'}
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
            {el.hourlyPrice / 100 + ' $'}
          </Tag>
        )),
    },
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
                    navigate(`${ROUTES.letsTripTransfer}/edit/${record.id}`);
                  }}
                >
                  <Icon name="EditOutlined" />
                </Button>
                <Button type="primary" danger key={3} onClick={() => handleDelete(record)}>
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
