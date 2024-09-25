import { Table } from '@/components/common';
import { utils } from './utils';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const BookingPropertyTranslationTable = () => {
  const {
    property,
    loading: { get },
  } = useTypedSelector((s) => s.bookingProperty);
  const { getOneProperty, setModal } = useActions();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getOneProperty({ id: Number(id) });
    }
  }, [id]);

  return (
    <Table
      rowKey={'id'}
      columns={utils()}
      dataSource={property?.translations ? [property, ...property.translations] : []}
      onClick={() => {
        setModal(true);
      }}
      loading={get}
      bordered
      path="#"
    />
  );
};
