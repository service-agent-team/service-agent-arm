import { useActions, useTypedSelector } from '@/common/hooks';
import { Modal } from '@/components/common/modal';
import { TransferCarSettingsForm } from '@/components/forms';

export const TransferCarSettingsModal = () => {
  const { setCarModal, setSelectCarDirection } = useActions();
  const {
    modal: { car_settings },
  } = useTypedSelector((state) => state.letsTripTransfer);

  const onClose = () => {
    setSelectCarDirection(null);
    setCarModal(false);
  };
  return (
    <Modal title="Car settings" size="large" onCancel={onClose} open={car_settings} footer={null}>
      <TransferCarSettingsForm />
    </Modal>
  );
};
