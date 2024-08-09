import { Icon, modal } from '@/components';
import { addNotification } from '@/common';
import { IFacility } from '@/store/booking/facility/types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const Actions = ({ record }: { record: IFacility }) => {
  const { deleteFacility, setBookingFacility } = useActions();
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

  return (
    <Flex gap="middle" justify="center">
      <Link to={ROUTES.bookingFacility}>
        <Icon btn type="primary" name="EditOutlined" />
      </Link>

      <Icon btn type="primary" danger name="DeleteOutlined" onClick={handleDelete} />
    </Flex>
  );
};
