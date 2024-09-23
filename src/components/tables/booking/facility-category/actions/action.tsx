import { Icon, modal } from '@/components';
import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { IFacilityCategory } from '@/store/booking/facility-category/types';

export const Actions = ({ record }: { record: IFacilityCategory }) => {
  const { deleteFacilityCategory, setBookingFacilityCategory, setModal, setOneFacilityCategory } =
    useActions();
  const { facilityCategories } = useTypedSelector((s) => s.bookingFacilityCategory);

  const handleDelete = () => {
    return modal.confirm({
      okText: 'Delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteFacilityCategory({
          callback() {
            addNotification('Successfully deleted');
            setBookingFacilityCategory(facilityCategories?.filter((f) => f.id !== record.id));
          },
          id: record.id,
        });
      },
    });
  };

  const handleModal = () => {
    setOneFacilityCategory(record);
    setModal(true);
  };

  return (
    <Flex gap="middle" justify="center">
      <Icon btn name="TranslationOutlined" type="dashed" onClick={handleModal} />

      <Link to={`${ROUTES.bookingFacilityCategory}/edit/${record.id}/${record.languageType}`}>
        <Icon btn type="primary" name="EditOutlined" />
      </Link>

      <Icon btn type="primary" danger name="DeleteOutlined" onClick={handleDelete} />
    </Flex>
  );
};
