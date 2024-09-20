import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { modal } from '@/components';
import { Icon } from '@/components/common/icon';
import { IDirection } from '@/store/lets-trip/transfer/types';
import { Button, Space } from 'antd';

export const SubActions = ({ record, carId }: { record: IDirection; carId: number }) => {
  const {
    deleteTransferDirection,
    setCarModal,
    setSelectCar,
    setCarModalType,
    setSelectCarDirection,
    setLetsTripTransfers,
  } = useActions();
  const { transfers } = useTypedSelector((s) => s.letsTripTransfer);

  const handleDelete = (record: IDirection) => {
    modal.confirm({
      okText: 'Delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteTransferDirection({
          callback() {
            const filteredData = transfers.map((t) => {
              if (t.id === carId) {
                return t.directions.filter((d) => d.id !== record.id);
              }
              return t;
            });
            setLetsTripTransfers(filteredData);
            addNotification('Successfully deleted direction');
          },
          carId,
          directionId: record.id,
        });
      },
    });
  };

  const handleEdit = (record: IDirection) => {
    setCarModal(true);
    setCarModalType('edit');
    setSelectCar(carId);
    setSelectCarDirection(record);
  };

  return (
    <Space>
      <Button type="primary" key={1} onClick={() => handleEdit(record)}>
        <Icon name="EditOutlined" />
      </Button>
      <Button type="primary" danger key={2} onClick={() => handleDelete(record)} disabled>
        <Icon name="DeleteOutlined" />
      </Button>
    </Space>
  );
};
