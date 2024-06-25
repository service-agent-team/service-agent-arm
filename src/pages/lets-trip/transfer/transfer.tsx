import { useActions, useTypedSelector } from '@/common/hooks';
import { Icon, PageTitle, SearchInput } from '@/components';
import { SimplePage } from '@/components/common/page';
import { TransferCarSettingsModal } from '@/components/modal';
import { LetsTripTransferTable } from '@/components/tables';
import { ROUTES } from '@/constants';
import { Button, Col, Row } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const LetsTripTransfer = () => {
  const { getByCategoryIdLetsTripTransfer } = useActions();
  const {
    pagination: { current, pageSize },
  } = useTypedSelector((state) => state.app);
  const { selectCategory } = useTypedSelector((state) => state.letsTripTransferCategory);
  const { id } = useParams();

  const restData = () => {
    getByCategoryIdLetsTripTransfer({
      page: current,
      size: pageSize,
      categoryId: Number(selectCategory?.id) || Number(id),
    });
  };

  useEffect(() => {
    restData();
  }, [id]);

  return (
    <SimplePage>
      <PageTitle
        title={`${selectCategory ? selectCategory?.name.en : ''} category cars`}
        icon="PlusOutlined"
        route={ROUTES.letsTripTransferCreate}
        label="Create car"
      >
        <Row gutter={24} style={{ marginRight: '2px' }}>
          <Col>
            <SearchInput />
          </Col>
          <Col>
            <Button onClick={restData} type="primary" shape="circle">
              <Icon name="SyncOutlined" />
            </Button>
          </Col>
        </Row>
      </PageTitle>
      <LetsTripTransferTable />
      <TransferCarSettingsModal />
    </SimplePage>
  );
};
