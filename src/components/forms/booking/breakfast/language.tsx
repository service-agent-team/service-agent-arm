import { LanguageType } from '@/common/enum';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm } from '@/components/common';
import { Button, Input, Select } from 'antd';

export const BreakfastLanguageForm = () => {
  const { addBreakfastLang, findBreakfasts, setBreakfastModal } = useActions();
  const { selectable_id } = useTypedSelector((state) => state.bookingBreakfast);
  const lang = Object.keys(LanguageType).map((el) => ({ value: el, label: el }));

  const handleClose = () => {
    setBreakfastModal({ name: 'translation', state: false });
  };

  const onFinish = (value: { languageType: LanguageType; name: string }) => {
    const body = { breakFastId: selectable_id, ...value };
    function cb() {
      findBreakfasts({});
      handleClose();
    }
    addBreakfastLang({ body, cb });
  };

  return (
    <BaseForm onFinish={onFinish}>
      <BaseForm.Item label="Language" name="languageType">
        <Select options={lang} placeholder="language" />
      </BaseForm.Item>
      <BaseForm.Item label="Name" name="name" required={true}>
        <Input placeholder="name" />
      </BaseForm.Item>
      <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
        Save
      </Button>
    </BaseForm>
  );
};
