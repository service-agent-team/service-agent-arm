import { GlobalCountryForm, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';

export const LetsTripGlobalCountryCreate = () => {
  return (
    <SimplePage>
      <PageTitle
        title="Create Global Country"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripGlobalCountry}
        label="Back"
      />
      <GlobalCountryForm type="create" />
    </SimplePage>
  );
};
