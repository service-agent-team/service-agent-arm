import { Icon, modal } from '@/components';
import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Flex } from 'antd';
import { useParams } from 'react-router-dom';
import { IRoomTranslation } from '@/store/booking/room/types';

export const Actions = ({ record }: { record: IRoomTranslation }) => {
  const { deleteRoomTranslation, setOneRoom } = useActions();
  const { room } = useTypedSelector((s) => s.bookingRoom);
  const { id } = useParams();

  const handleDelete = () => {
    return modal.confirm({
      okText: 'Delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteRoomTranslation({
          cb() {
            addNotification('Successfully deleted');
            setOneRoom(
              room?.translations?.filter(
                (f) => f.name !== record.name && f.languageType !== record.languageType,
              ),
            );
          },
          id: Number(id),
          lang: record.languageType,
        });
      },
    });
  };

  return (
    <Flex gap="middle" justify="center">
      <Icon btn type="primary" danger name="DeleteOutlined" onClick={handleDelete} />
    </Flex>
  );
};
