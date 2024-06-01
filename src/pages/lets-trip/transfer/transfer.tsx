import { useActions, useTypedSelector } from '@/common/hooks';
import { PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { LetsTripTransferTable } from '@/components/tables';
import { ROUTES } from '@/constants';
import { Space, Switch, Typography } from 'antd';

export const LetsTripTransfer = () => {
  const { setLetsTripTransferStatus } = useActions();
  const { deleted } = useTypedSelector((state) => state.letsTripTransfer);
  const handleChange = (deleted: boolean) => {
    setLetsTripTransferStatus(deleted);
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
      </PageTitle>
      <LetsTripTransferTable />
    </SimplePage>
  );
};
