import { Table } from '@/components/common';
import { utils } from './utils';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const BookingRoomTranslationTable = () => {
  const {
    room,
    loading: { get },
  } = useTypedSelector((s) => s.bookingRoom);
  const { getOneRoomTranslation, setModal } = useActions();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getOneRoomTranslation({ id: Number(id) });
    }
  }, [id]);

  return (
    <Table
      rowKey={'id'}
      columns={utils()}
      dataSource={room?.translations ? [room, ...room.translations] : []}
      onClick={() => {
        setModal(true);
      }}
      loading={get}
      bordered
      path="#"
    />
  );
};
