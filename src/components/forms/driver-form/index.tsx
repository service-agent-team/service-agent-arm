import { BaseForm, PrimaryBtn } from '@/components';
import { Option, Select } from '@/components/common/selects/select';
import { ROUTES } from '@/constants';
import { useActions, useTypedSelector } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from '../users-form/styled';
import { ICreateDriveValues } from './types';

export const DriverForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createDriver, editDriver } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();

  const prefixSelector = (
    <BaseForm.Item name="prefix" noStyle>
      <Select style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Option value="998">+998</Option>
      </Select>
    </BaseForm.Item>
  );

  const { loading } = useTypedSelector((state) => state.driver);

  const onFinish = (value: ICreateDriveValues) => {
    if (type === 'create') {
      createDriver({
        phoneNumber: value.phoneNumber,
        callback: () => {
          addNotification('successfully created tariff');
          navigate(ROUTES.driver);
        },
      });
      form.resetFields();
    } else if (type === 'edit') {
      editDriver({
        id: id as string,
        phoneNumber: value.phoneNumber,
        callback: () => {
          addNotification('successfully eddited tariff');
          navigate('/transfer/car-type');
        },
      });
    }
  };

  return (
    <>
      <BaseForm name="usersForm" form={form} layout="vertical" onFinish={onFinish}>
        <S.FormContent>
          <BaseForm.Item
            style={{ width: '50%' }}
            name="phoneNumber"
            label={'phoneNumber'}
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <Input placeholder="Enter phoneNumber ?" addonBefore={prefixSelector} />
          </BaseForm.Item>

          <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.patch : loading.post}>
            {type === 'create' ? 'create' : 'edit'}
          </PrimaryBtn>
        </S.FormContent>
      </BaseForm>
    </>
  );
};
