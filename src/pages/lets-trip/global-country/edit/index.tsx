import { GlobalCountryForm, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';

export const LetsTripGlobalCountryEdit = () => {
  return (
    <SimplePage>
      <PageTitle
        title="Edit Global Country"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripGlobalCountry}
        label="Back"
      />
      <GlobalCountryForm type="edit" />
    </SimplePage>
  );
};
