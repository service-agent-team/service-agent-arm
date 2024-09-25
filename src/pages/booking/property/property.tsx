import { BookingBedTypeTable } from '@/components';
import { BedTypeTranslationModal } from '@/components/modal/booking/bed-type-translation';

export const BookingProperty = () => {
  return (
    <>
      <BookingBedTypeTable />
      <BedTypeTranslationModal />
    </>
  );
};
