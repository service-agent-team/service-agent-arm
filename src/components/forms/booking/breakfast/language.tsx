import { LanguageType } from '@/common/enum';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, Field } from '@/components/common';
import { Button } from 'antd';

export const BreakfastLanguageForm = () => {
  const { addBreakfastLang, findBreakfasts, setBreakfastModal } = useActions();
  const { selectable_id, loading } = useTypedSelector((state) => state.bookingBreakfast);
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
    <BaseForm onFinish={onFinish} loading={loading} save={false}>
      <Field span={24} name="name" label="Name" isRequired />

      <Field span={24} name="languageType" label="Language" isRequired options={lang} />

      <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
        Save
      </Button>
    </BaseForm>
  );
};
