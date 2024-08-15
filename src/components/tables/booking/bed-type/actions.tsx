import { Icon, modal } from '@/components';
import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { IBedType } from '@/store/booking/bed-type/types';

export const Actions = ({ record }: { record: IBedType }) => {
  const { deleteBedType, setBedType } = useActions();
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

  return (
    <Flex gap="middle" justify="center">
      <Link to={`${ROUTES.bookingBedType}/edit/${record.id}/${record.languageType}`}>
        <Icon btn type="primary" name="EditOutlined" />
      </Link>

      <Icon btn type="primary" danger name="DeleteOutlined" onClick={handleDelete} />
    </Flex>
  );
};
