import { PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { LetsTripTourTable } from '@/components/tables/lets-trip-tour';

export const LetsTripTour = () => {
  return (
    <SimplePage>
      <PageTitle title="Tours" icon="PlusOutlined" route={'#'} label="Create" />
      <LetsTripTourTable />
    </SimplePage>
  );
};
