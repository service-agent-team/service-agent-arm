import { useActions, useTypedSelector } from '@/common/hooks';
import { Icon, LetsTripGlobalCountryTable, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';
import { Button } from 'antd';

export const LetsTripGlobalCountry = () => {
  const { getAllGlobalCountry } = useActions();
  const {
    pagination: { current, pageSize },
  } = useTypedSelector((state) => state.app);

  const restData = () => {
    getAllGlobalCountry({
      page: current - 1,
      size: pageSize,
    });
  };
  return (
    <SimplePage>
      <PageTitle
        title="Global Countries"
        icon="PlusOutlined"
        route={ROUTES.letsTripGlobalCountryCreate}
        label="Create"
      >
        <Button onClick={restData} type="primary" shape="circle">
          <Icon name="SyncOutlined" />
        </Button>
      </PageTitle>
      <LetsTripGlobalCountryTable />
    </SimplePage>
  );
};
