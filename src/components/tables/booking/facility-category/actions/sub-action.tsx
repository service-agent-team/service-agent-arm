import { Icon, modal } from '@/components';
import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { TBreakfastTranslation } from '@/types/booking';

export const SubActions = ({ record, id }: { record: TBreakfastTranslation; id: number }) => {
  const { deleteFacilityCategoryTranslation, setBookingFacilityCategory } = useActions();
  const { facilityCategories } = useTypedSelector((s) => s.bookingFacilityCategory);

  const handleDelete = () => {
    return modal.confirm({
      okText: 'Delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteFacilityCategoryTranslation({
          callback() {
            addNotification('Successfully deleted');
            setBookingFacilityCategory(
              facilityCategories?.map((f) => {
                if (f.id === id) {
                  return {
                    ...f,
                    translations: f.translations.filter(
                      (t) => t.name !== record.name && t.languageType !== record.languageType,
                    ),
                  };
                }

                return f;
              }),
            );
          },
          id,
          lang: record.languageType,
        });
      },
    });
  };

  return <Icon btn type="primary" danger name="DeleteOutlined" onClick={handleDelete} />;
};
