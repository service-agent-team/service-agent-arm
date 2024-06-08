import { LetsTripGlobalCountryTable, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';

export const LetsTripGlobalCountry = () => {
  return (
    <SimplePage>
      <PageTitle
        title="Global Countries"
        icon="PlusOutlined"
        route={ROUTES.letsTripGlobalCountryCreate}
        label="Create"
      />
      <LetsTripGlobalCountryTable />
    </SimplePage>
  );
};
