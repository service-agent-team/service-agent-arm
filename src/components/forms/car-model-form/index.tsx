import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, PrimaryBtn } from '@/components';
import { useActions, useTypedSelector } from '@/hooks';
import { Input } from 'antd';
import * as S from '../users-form/styled';

export const CarModelForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { CreateCarModel } = useActions();

  const { loading } = useTypedSelector((state) => state.carType);

  const onFinish = (value: { name: string }) => {
    if (type === 'create') {
      CreateCarModel({
        body: value,
        callback(data: any) {
          if (data) addNotification('Succesfully created model!');
        },
      });
    } else {
      // UpdateCarModel({
      //   body: value,
      //   callback(data: any) {
      //     if (data) addNotification('created');
      //   },
      // });
    }
    form.resetFields();
    history.back();
  };

  return (
    <>
      <BaseForm name="carModelForm" form={form} layout="vertical" onFinish={onFinish}>
        <S.FormContent>
          <BaseForm.Item
            name="name"
            label={'Car model name'}
            hasFeedback
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <Input placeholder="Enter car model name ?" />
          </BaseForm.Item>

          <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.patch : loading.post}>
            {type === 'create' ? 'create' : 'edit'}
          </PrimaryBtn>
        </S.FormContent>
      </BaseForm>
    </>
  );
};
