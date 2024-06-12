import { PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { LetsTripGroupTourTable } from '@/components';
import { ROUTES } from '@/constants';
import { Space, Switch, Typography } from 'antd';
import { useActions, useTypedSelector } from '@/common/hooks';

export const LetsTripGroupTour = () => {
  const { setLetsTripGroupTourStatus } = useActions();
  const { deleted } = useTypedSelector((state) => state.letsTripTour);
  const handleChange = (deleted: boolean) => {
    setLetsTripGroupTourStatus(deleted);
  };

  return (
    <SimplePage>
      <PageTitle
        title="Group Tours"
        icon="PlusOutlined"
        route={ROUTES.letsTripGroupTourCreate}
        label="Create"
      >
        <Space>
          <Typography.Text strong>Is Active</Typography.Text>
          <Switch defaultValue={deleted} onChange={handleChange} style={{ marginRight: ' 10px' }} />
        </Space>
      </PageTitle>

      <LetsTripGroupTourTable />
    </SimplePage>
  );
};
