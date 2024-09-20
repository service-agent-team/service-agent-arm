import { Button, Space } from 'antd';
import { ILetsTripTransfer } from '@/store/lets-trip/transfer/types';
import { Icon } from '@/components/common/icon';
import { useActions, useTypedSelector } from '@/common/hooks';
import { modal } from '@/components';
import { addNotification } from '@/common';
import { ROUTES } from '@/constants';
import { useNavigate } from 'react-router-dom';

export const Actions = ({ record }: { record: ILetsTripTransfer }) => {
  const {
    deleteLetsTripTransfer,
    setLetsTripTransfers,
    setCarModal,
    setSelectCar,
    setCarModalType,
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
    setCarModalType('create');
  };

  return (
    <div>
      <Space>
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
      </Space>
    </div>
  );
};
