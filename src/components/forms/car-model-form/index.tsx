import { history, useActions, useTypedSelector } from '@/libs';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from '../users-form/styled';
import { BaseForm, PrimaryBtn } from '@/components';
import { Input } from 'antd';
import { addNotification } from '@/libs/utils/addNotification';

export const CarModelForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { CreateCarModel, UpdateCarModel } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();

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
      UpdateCarModel({
        body: value,
        callback(data: any) {
          if (data) addNotification('Succesfully created model!');
        },
      });
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
