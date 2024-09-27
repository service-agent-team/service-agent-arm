import { Table } from '@/components/common';
import { utils } from './utils';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Select } from 'antd';
import { LanguageType } from '@/common/enum';

export const BookingRoomTable = () => {
  const {
    rooms,
    loading: { get },
    lang,
  } = useTypedSelector((s) => s.bookingRoom);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((s) => s.app);
  const { setPagination, getByPropertyRoom, setRoomLang } = useActions();

  const { id } = useParams();

  const langOpt = Object.keys(LanguageType).map((l) => ({ label: l, value: l }));

  useEffect(() => {
    if (current) {
      getByPropertyRoom({ propertyId: Number(id), lang, page: current - 1, size: pageSize });
    }
  }, [current, lang]);

  return (
    <Table
      rowKey={'id'}
      columns={utils()}
      dataSource={rooms ? rooms : []}
      onChange={(p) => setPagination(p)}
      pagination={{ current, pageSize, total }}
      loading={get}
      bordered
      select={
        <Select
          defaultValue={lang}
          options={langOpt}
          onChange={(v) => setRoomLang(v)}
          placeholder="Select language"
        />
      }
    />
  );
};
