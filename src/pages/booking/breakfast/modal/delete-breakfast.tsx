import { useActions, useTypedSelector } from '@/common/hooks';
import { Modal } from '@/components';

export const DeleteBreakfastModal = () => {
  const { setBreakfastModal, deleteBreakfast, findBreakfasts } = useActions();
  const { modal, selectable_id } = useTypedSelector((state) => state.bookingBreakfast);
  const handleCloseModel = () => {
    setBreakfastModal({ name: 'delete', state: false });
  };

  const handleDelete = () => {
    function cb() {
      findBreakfasts({});
      handleCloseModel();
    }
    deleteBreakfast({ id: selectable_id, cb });
  };
  return (
    <Modal onCancel={handleCloseModel} onOk={handleDelete} open={modal.delete}>
      Delete this breakfast?
    </Modal>
  );
};
