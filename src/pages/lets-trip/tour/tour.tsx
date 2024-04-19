import { PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { LetsTripTourTable } from '@/components';
import { ROUTES } from '@/constants';

export const LetsTripTour = () => {
  return (
    <SimplePage>
      <PageTitle
        title="Tours"
        icon="PlusOutlined"
        route={ROUTES.letsTripTourCreate}
        label="Create"
      />
      <LetsTripTourTable />
    </SimplePage>
  );
};
