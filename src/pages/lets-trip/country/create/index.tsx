import { LetsTripCountryForm, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';

export const LetsTripCountryCreate = () => {
  return (
    <SimplePage>
      <PageTitle
        title="Create Countries"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripCountry}
        label="Back"
      />
      <LetsTripCountryForm type="create" />
    </SimplePage>
  );
};
