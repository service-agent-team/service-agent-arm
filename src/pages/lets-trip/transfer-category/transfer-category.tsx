import { useActions, useTypedSelector } from '@/common/hooks';
import { PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { LetsTripTransferCategoryTable } from '@/components/tables';
import { ROUTES } from '@/constants';
import { Space, Switch, Typography } from 'antd';

export const LetsTripTransferCategory = () => {
  const { setLetsTripTransferCategoryStatus } = useActions();
  const { deleted } = useTypedSelector((state) => state.letsTripTransferCategory);
  const handleChange = (deleted: boolean) => {
    setLetsTripTransferCategoryStatus(deleted);
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
      </PageTitle>
      <LetsTripTransferCategoryTable />
    </SimplePage>
  );
};
