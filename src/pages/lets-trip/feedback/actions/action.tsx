import { Icon } from '@/components';
import { Flex } from 'antd';
import { useActions } from '@/common/hooks';
import { IFeedback } from '@/store/lets-trip/feedback/types';

export const Actions = ({ record }: { record: IFeedback }) => {
  const { setOneFeedback, setFeedbackModal } = useActions();

  const handleConfirm = () => {
    setFeedbackModal({ name: 'confirm', data: true });
    setOneFeedback(record);
  };

  return (
    <Flex gap="middle" justify="center">
      <Icon btn name="SettingOutlined" type="dashed" onClick={handleConfirm} />
    </Flex>
  );
};
