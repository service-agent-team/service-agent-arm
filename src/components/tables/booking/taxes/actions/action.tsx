import { Icon, modal } from '@/components';
import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { ITaxe } from '@/store/booking/taxes/types';

export const Actions = ({ record }: { record: ITaxe }) => {
  const { deleteTaxe, setTaxes, setOneTaxe, setModal } = useActions();
  const { taxes } = useTypedSelector((s) => s.bookingTaxes);

  const handleDelete = () => {
    return modal.confirm({
      okText: 'Delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteTaxe({
          callback() {
            addNotification('Successfully deleted');
            setTaxes(taxes?.filter((f) => f.id !== record.id));
          },
          id: record.id,
        });
      },
    });
  };

  const handleModal = () => {
    setOneTaxe(record);
    setModal(true);
  };

  return (
    <Flex gap="middle" justify="center">
      <Icon btn name="TranslationOutlined" type="dashed" onClick={handleModal} />

      <Link to={`${ROUTES.bookingTaxes}/edit/${record.id}/${record.languageType}`}>
        <Icon btn type="primary" name="EditOutlined" />
      </Link>

      <Icon btn type="primary" danger name="DeleteOutlined" onClick={handleDelete} />
    </Flex>
  );
};
