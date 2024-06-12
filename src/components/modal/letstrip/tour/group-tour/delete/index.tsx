import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { modal } from '@/components';
import { ILetsTripGroupTourByCountryId } from '@/store/lets-trip/group-tour/types';

export const GroupTourHandleDeleteConfirm = (record: ILetsTripGroupTourByCountryId) => {
  const { deleteLetsTripGroupTour, setLetsTripGroupTourByCountryId } = useActions();
  const { byCountryIdTours } = useTypedSelector((state) => state.letsTripTour);

  return modal.confirm({
    okText: 'Delete',
    title: `You want to delete right ?`,
    onOk: () => {
      deleteLetsTripGroupTour({
        callback() {
          addNotification('successfully deleted');
          if (byCountryIdTours)
            setLetsTripGroupTourByCountryId(
              byCountryIdTours.filter((el) => el.tourId !== record.tourId),
            );
        },
        id: String(record?.tourId),
      });
    },
  });
};
