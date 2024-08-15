import { useTypedSelector } from '@/common/hooks';
import { Modal } from '@/components';

export const DeleteBreakfastModal = () => {
  const { isModal } = useTypedSelector((state) => state.app);
  return <Modal open={isModal}></Modal>;
};
