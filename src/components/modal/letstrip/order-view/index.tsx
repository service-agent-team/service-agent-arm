import { useActions, useTypedSelector } from '@/common/hooks';
import { Modal } from '@/components/common/modal';

export const OrderViewModal = () => {
  const { setModal } = useActions();
  const { isModal } = useTypedSelector((state) => state.app);

  const onClose = () => {
    setModal(false);
  };
  return (
    <Modal title="Car settings" size="large" onCancel={onClose} open={isModal} footer={null}>
      ok
    </Modal>
  );
};
