import { Icon, modal } from '@/components';
import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { IBedType } from '@/store/booking/bed-type/types';
import { TBreakfastTranslation } from '@/types/booking';

export const Actions = ({ record }: { record: IBedType }) => {
  const { deleteBedType, setBedType, setOneBedType, setModal } = useActions();
  const { bedTypes } = useTypedSelector((s) => s.bookingBedType);

  const handleDelete = () => {
    return modal.confirm({
      okText: 'Delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteBedType({
          callback() {
            addNotification('Successfully deleted');
            setBedType(bedTypes?.filter((f) => f.id !== record.id));
          },
          id: record.id,
        });
      },
    });
  };

  const handleModal = () => {
    setOneBedType(record);
    setModal(true);
  };

  return (
    <Flex gap="middle" justify="center">
      <Icon btn name="TranslationOutlined" type="dashed" onClick={handleModal} />

      <Link to={`${ROUTES.bookingBedType}/edit/${record.id}/${record.languageType}`}>
        <Icon btn type="primary" name="EditOutlined" />
      </Link>

      <Icon btn type="primary" danger name="DeleteOutlined" onClick={handleDelete} />
    </Flex>
  );
};

export const SubActions = ({ record, id }: { record: TBreakfastTranslation; id: number }) => {
  const { deleteBedTypeTranslation, setBedType } = useActions();
  const { bedTypes } = useTypedSelector((s) => s.bookingBedType);

  const handleDelete = () => {
    return modal.confirm({
      okText: 'Delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteBedTypeTranslation({
          callback() {
            addNotification('Successfully deleted');
            setBedType(
              bedTypes?.map((f) => {
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
