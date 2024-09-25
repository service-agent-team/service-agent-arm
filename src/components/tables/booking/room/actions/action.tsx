import { Icon } from '@/components';
import { Flex } from 'antd';
import { IRoom } from '@/store/booking/room/types';
import { useNavigate } from 'react-router-dom';

export const Actions = ({ record }: { record: IRoom }) => {
  const navigate = useNavigate();

  const handleModal = () => {
    navigate(`${record.id}`);
  };

  return (
    <Flex gap="middle" justify="center">
      <Icon btn name="TranslationOutlined" type="dashed" onClick={handleModal} />
    </Flex>
  );
};
