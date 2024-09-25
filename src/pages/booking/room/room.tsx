import { BookingBedTypeTable } from '@/components';
import { BedTypeTranslationModal } from '@/components/modal/booking/bed-type-translation';

export const BookingRoom = () => {
  return (
    <>
      <BookingBedTypeTable />
      <BedTypeTranslationModal />
    </>
  );
};
