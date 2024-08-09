import { BookingFacilityTable, PageTitle } from '@/components';
import { ROUTES } from '@/constants';

export const BookingFacility = () => {
  return (
    <>
      <PageTitle
        title="Facility Create"
        route={ROUTES.bookingFacilityCreate}
        label="Create"
        icon="PlusOutlined"
      />
      <BookingFacilityTable />
    </>
  );
};
