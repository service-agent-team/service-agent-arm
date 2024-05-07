import { useActions, useTypedSelector } from '@/common/hooks';
import { LetsTripIndividualTourTable, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';
import { Space, Switch, Typography } from 'antd';

export const LetsTripIndividualTour = () => {
  const { setLetsTripIndividualTourStatus } = useActions();
  const { deleted } = useTypedSelector((state) => state.letsTripIndividualTour);
  const handleChange = (deleted: boolean) => {
    setLetsTripIndividualTourStatus(deleted);
  };
  return (
    <SimplePage>
      <PageTitle
        title="Individual Tours"
        icon="PlusOutlined"
        route={ROUTES.letsTripIndividualTourCreate}
        label="Create"
      >
        <Space>
          <Typography.Text strong>Is Active</Typography.Text>
          <Switch defaultValue={deleted} onChange={handleChange} style={{ marginRight: ' 10px' }} />
        </Space>
      </PageTitle>
      <LetsTripIndividualTourTable />
    </SimplePage>
  );
};
