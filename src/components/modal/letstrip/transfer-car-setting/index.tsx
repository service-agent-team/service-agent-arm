import { useActions, useTypedSelector } from '@/common/hooks';
import { Modal } from '@/components/common/modal';
import { TransferCarSettinsForm } from '@/components/forms';

export const TransferCarSettingsModal = () => {
  const { setCarModal } = useActions();
  const {
    modal: { car_settings },
  } = useTypedSelector((state) => state.letsTripTransfer);

  const onClose = () => {
    setCarModal(false);
  };
  return (
    <Modal title="Car settings" size="large" onCancel={onClose} open={car_settings} footer={null}>
      <TransferCarSettinsForm />
    </Modal>
  );
};
