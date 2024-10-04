import { Table } from '@/components/common';
import { utils } from './utils';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useEffect } from 'react';
import { Icon, LestTripFeedbackConfirmModal, LestTripFeedbackFilterModal } from '@/components';
import { Button } from 'antd';

export const LetsTripFeedback = () => {
  const {
    type,
    state,
    feedbacks,
    loading: { get },
  } = useTypedSelector((s) => s.letsTripFeedback);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((s) => s.app);
  const { setPagination, getAllFeedback, setFeedbackModal } = useActions();

  useEffect(() => {
    if (current) {
      getAllFeedback({ type, state, page: current - 1, size: pageSize });
    }
  }, [current, pageSize, type, state]);

  return (
    <>
      <Table
        rowKey={'id'}
        columns={utils()}
        dataSource={feedbacks ? feedbacks : []}
        onChange={(p) => setPagination(p)}
        pagination={{ current, pageSize, total }}
        loading={get}
        select={
          <Button
            type="primary"
            icon={<Icon name="FilterOutlined" />}
            onClick={() => setFeedbackModal({ name: 'filter', data: true })}
          >
            Filter
          </Button>
        }
        bordered
        isAdd
      />
      <LestTripFeedbackFilterModal />
      <LestTripFeedbackConfirmModal />
    </>
  );
};
