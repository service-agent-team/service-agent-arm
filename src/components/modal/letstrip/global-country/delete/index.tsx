import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { modal } from '@/components';
import { ILetsTripGlobalCountry } from '@/store/lets-trip/global-country/types';

export const globalCountryHandleDeleteConfirm = (record: ILetsTripGlobalCountry) => {
  const { deleteGlobalCountry, setGlobalCountry } = useActions();
  const { globalCountries } = useTypedSelector((state) => state.letsTripGlobalCountry);

  return modal.confirm({
    okText: 'Delete',
    title: `You want to delete right ?`,
    onOk: () => {
      deleteGlobalCountry({
        callback() {
          addNotification('successfully deleted');
          if (globalCountries)
            setGlobalCountry(globalCountries.filter((el) => el.id !== record.id));
        },
        countryId: Number(record?.id),
      });
    },
  });
};
