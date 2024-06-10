import { useTypedSelector } from '@/common/hooks';
import { GlobalRegionForm, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';

export const LetsTripGlobalRegionCreate = () => {
  const { selectCountry } = useTypedSelector((state) => state.letsTripGlobalCountry);

  return (
    <SimplePage>
      <PageTitle
        title="Create Global Region"
        icon="ArrowLeftOutlined"
        route={`${ROUTES.letsTripGlobalRegion}/${selectCountry?.id}`}
        label="Back"
      />
      <GlobalRegionForm type="create" />
    </SimplePage>
  );
};
