import { Icon, modal } from '@/components';
import { addNotification } from '@/common';
import { IFacility } from '@/store/booking/facility/types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const Actions = ({ record }: { record: IFacility }) => {
  const { deleteFacility, setBookingFacility, setModal, setOneFacility } = useActions();
  const { facilities } = useTypedSelector((s) => s.bookingFacility);

  const handleDelete = () => {
    return modal.confirm({
      okText: 'Delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteFacility({
          callback() {
            addNotification('Successfully deleted');
            setBookingFacility(facilities?.filter((f) => f.id !== record.id));
          },
          id: record.id,
        });
      },
    });
  };

  const handleModal = () => {
    setOneFacility(record);
    setModal(true);
  };

  return (
    <Flex gap="middle" justify="center">
      <Icon btn name="TranslationOutlined" type="dashed" onClick={handleModal} />

      <Link to={`${ROUTES.bookingFacility}/edit/${record.id}/${record.languageType}`}>
        <Icon btn type="primary" name="EditOutlined" />
      </Link>

      <Icon btn type="dashed" danger name="DeleteOutlined" onClick={handleDelete} />
    </Flex>
  );
};
