import { useActions } from '@/common/hooks';
import { BreakfastModalKeys } from '@/store/booking/breakfast/slice';
import { DeleteOutlined, EditOutlined, TranslationOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';

export const Actions = ({ id }: { id: number }) => {
  const { setBreakfastModal, setBreakfastSelectableId } = useActions();
  const handleOpenModal = (type: BreakfastModalKeys) => {
    setBreakfastSelectableId(id);
    setBreakfastModal({ name: type, state: true });
  };
  return (
    <Flex gap={10} align="center" justify="center">
      <Button
        onClick={() => handleOpenModal('translation')}
        type="primary"
        icon={<TranslationOutlined />}
      />
      <Link to={`${id}`}>
        <Button type="primary" icon={<EditOutlined />} />
      </Link>
      <Button
        onClick={() => handleOpenModal('delete')}
        danger
        type="dashed"
        icon={<DeleteOutlined />}
      />
    </Flex>
  );
};
