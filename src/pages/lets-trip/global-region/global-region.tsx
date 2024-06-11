import { useActions, useTypedSelector } from '@/common/hooks';
import { Icon, LetsTripGlobalRegionTable, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';

export const LetsTripGlobalRegion = () => {
  const { getByCountryIdRegion } = useActions();
  const {
    pagination: { current, pageSize },
  } = useTypedSelector((state) => state.app);
  const { id } = useParams();

  const restData = () => {
    getByCountryIdRegion({
      page: current - 1,
      size: pageSize,
      countryId: Number(id),
    });
  };

  return (
    <SimplePage>
      <PageTitle
        title="Global Regions"
        icon="PlusOutlined"
        route={ROUTES.letsTripGlobalRegionCreate}
        label="Create"
      >
        <Button onClick={restData} type="primary" shape="circle">
          <Icon name="SyncOutlined" />
        </Button>
      </PageTitle>
      <LetsTripGlobalRegionTable />
    </SimplePage>
  );
};
