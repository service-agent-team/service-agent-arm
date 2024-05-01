import { PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { LetsTripGroupTourTable } from '@/components';
import { ROUTES } from '@/constants';

export const LetsTripGroupTour = () => {
  return (
    <SimplePage>
      <PageTitle
        title="Tours"
        icon="PlusOutlined"
        route={ROUTES.letsTripGroupTourCreate}
        label="Create"
      />
      <LetsTripGroupTourTable />
    </SimplePage>
  );
};
