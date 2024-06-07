import { useActions, useTypedSelector } from '@/common/hooks';
import { Icon, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { LetsTripTransferCategoryTable } from '@/components/tables';
import { ROUTES } from '@/constants';
import { Button, Space, Switch, Typography } from 'antd';

export const LetsTripTransferCategory = () => {
  const { setLetsTripTransferCategoryStatus, getAllLetsTripTransferCategory } = useActions();
  const { deleted } = useTypedSelector((state) => state.letsTripTransferCategory);
  const handleChange = (deleted: boolean) => {
    setLetsTripTransferCategoryStatus(deleted);
  };
  const restData = () => {
    getAllLetsTripTransferCategory({
      page: 0,
      size: 100,
      deleted: false,
    });
  };
  return (
    <SimplePage>
      <PageTitle
        title="Transfer Categories"
        icon="PlusOutlined"
        route={ROUTES.letsTripTransferCategoryCreate}
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
      <LetsTripTransferCategoryTable />
    </SimplePage>
  );
};
