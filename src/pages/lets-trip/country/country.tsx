import { LetsTripCountryTable, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';

export const LetsTripCountry = () => {
  return (
    <SimplePage>
      <PageTitle
        title="Countries"
        icon="PlusOutlined"
        route={ROUTES.letsTripCountryCreate}
        label="Create"
      />
      <LetsTripCountryTable />
    </SimplePage>
  );
};
