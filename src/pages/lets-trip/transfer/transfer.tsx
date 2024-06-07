import { useActions, useTypedSelector } from '@/common/hooks';
import { Icon, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { TransferCarSettingsModal } from '@/components/modal';
import { LetsTripTransferTable } from '@/components/tables';
import { ROUTES } from '@/constants';
import { Button, Space, Switch, Typography } from 'antd';

export const LetsTripTransfer = () => {
  const { setLetsTripTransferStatus, getAllLetsTripTransfer } = useActions();
  const { deleted } = useTypedSelector((state) => state.letsTripTransfer);
  const handleChange = (deleted: boolean) => {
    setLetsTripTransferStatus(deleted);
  };

  const restData = () => {
    getAllLetsTripTransfer({
      page: 0,
      size: 30,
      callback() {},
    });
  };

  return (
    <SimplePage>
      <PageTitle
        title="Transfers"
        icon="PlusOutlined"
        route={ROUTES.letsTripTransferCreate}
        label="Create"
      >
        <Space>
          <Typography.Text strong>Is Active</Typography.Text>

          <Switch defaultValue={deleted} onChange={handleChange} style={{ marginRight: ' 10px' }} />
        </Space>

        <Button onClick={restData} type="primary" shape="circle">
          <Icon name="SyncOutlined" />
        </Button>
      </PageTitle>
      <LetsTripTransferTable />
      <TransferCarSettingsModal />
    </SimplePage>
  );
};
