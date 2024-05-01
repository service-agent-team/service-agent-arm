import { LetsTripIndividualTourTable, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';

export const LetsTripIndividualTour = () => {
  return (
    <SimplePage>
      <PageTitle
        title="Individual Tours"
        icon="PlusOutlined"
        route={ROUTES.letsTripIndividualTourCreate}
        label="Create"
      />
      <LetsTripIndividualTourTable />
    </SimplePage>
  );
};
