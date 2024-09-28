import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { modal } from '@/components';
import { Icon } from '@/components/common/icon';
import { IProcess } from '@/store/process/diagram/types';
import { Button, Space } from 'antd';

export const SubActions = ({ record, projectId }: { record: IProcess; projectId: number }) => {
  const {
    deleteProcess,
    setCarModal,
    setSelectCar,
    setCarModalType,
    setSelectCarDirection,
    setLetsTripTransfers,
  } = useActions();
  const { projects } = useTypedSelector((s) => s.processProject);

  const handleDelete = (record: IProcess) => {
    modal.confirm({
      okText: 'Delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteProcess({
          cb() {
            const filteredData = projects?.map((p) => {
              if (p.id === projectId) {
                return p.processes.filter((d) => d.id !== record.id);
              }
              return p;
            });
            setLetsTripTransfers(filteredData);
            addNotification('Successfully deleted process');
          },
          id: record.id,
        });
      },
    });
  };

  const handleEdit = (record: IProcess) => {
    setCarModal(true);
    setCarModalType('edit');
    setSelectCar(projectId);
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
