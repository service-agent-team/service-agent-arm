import { BookingFacilityCategoryTable, PageTitle } from '@/components';
import { ROUTES } from '@/constants';

export const BookingFacilityCategory = () => {
  return (
    <>
      <PageTitle
        title="Facility Categories"
        route={ROUTES.bookingFacilityCategoryCreate}
        label="Create"
        icon="PlusOutlined"
      />
      <BookingFacilityCategoryTable />
    </>
  );
};
