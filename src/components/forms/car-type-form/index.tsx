import { BaseForm, PrimaryBtn, Select } from '@/components';
import { Option } from '@/components/common/selects/select';
import { useActions, useTypedSelector } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { Flex, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from '../users-form/styled';
import { ICreateCarTypeValues } from './types';

export const CarTypeForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createCarType, ediCarType } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading } = useTypedSelector((state) => state.carType);

  const onFinish = (value: ICreateCarTypeValues) => {
    if (type === 'create') {
      createCarType({
        withBaggage: value.withBaggage,
        numberOfSeats: +value.numberOfSeats,
        callback: () => {
          addNotification('successfully created tariff');
          navigate('/transfer/car-type');
        },
      });
      form.resetFields();
    } else if (type === 'edit') {
      ediCarType({
        id: id as string,
        withBaggage: value.withBaggage,
        numberOfSeats: +value.numberOfSeats,
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
            name="withBaggage"
            label={'withBaggage'}
            hasFeedback
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <Select placeholder="Select an option">
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </BaseForm.Item>

          <Flex justify="space-between" gap={'10px'}>
            <BaseForm.Item
              style={{ width: '50%' }}
              name="numberOfSeats"
              label={'numberOfSeats'}
              rules={[{ required: true, message: 'filed is required' }]}
            >
              <Input placeholder="Enter numberOfSeats ?" />
            </BaseForm.Item>
          </Flex>

          <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.patch : loading.post}>
            {type === 'create' ? 'create' : 'edit'}
          </PrimaryBtn>
        </S.FormContent>
      </BaseForm>
    </>
  );
};
