import { useActions, useTypedSelector } from '@/common/hooks';
import { BreakfastLanguageForm, Modal } from '@/components';

export const LanguageModal = () => {
  const { setBreakfastModal } = useActions();
  const { modal } = useTypedSelector((state) => state.bookingBreakfast);

  const handleClose = () => {
    setBreakfastModal({ name: 'translation', state: false });
  };

  return (
    <Modal footer={null} onCancel={handleClose} open={modal.translation}>
      <BreakfastLanguageForm />
    </Modal>
  );
};
