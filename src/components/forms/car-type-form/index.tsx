import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, PrimaryBtn } from '@/components';
import { useActions, useTypedSelector } from '@/hooks';
import { ICreateCarValues } from '@/pages/transfer/car/create-page/types.ts';
import { Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from '../users-form/styled';

export const CarTypeForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createCarType, getCarType, ediCarType } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();

  const { carTypeOne, loading } = useTypedSelector((state) => state.carType);

  const onFinish = (value: ICreateCarValues) => {
    if (type === 'create') {
      createCarType({
        numberOfBaggages: +value.numberOfBaggages,
        numberOfSeats: +value.numberOfSeats,
        callback: () => {
          getCarType({ callback: () => {}, page: 0, size: 100 });
          addNotification('created');
          navigate('/transfer/car-type');
        },
      });
      // form.resetFields();
    } else if (type === 'edit') {
      ediCarType({
        id: id as string,
        numberOfSeats: +value.numberOfSeats,
        numberOfBaggages: +value.numberOfBaggages,
        callback: () => {
          addNotification('edited');
          navigate('/transfer/car-type');
        },
      });
    }
  };

  return (
    <>
      <BaseForm
        name="usersForm"
        initialValues={
          type === 'edit'
            ? {
                numberOfSeats: carTypeOne?.numberOfSeats,
                numberOfBaggages: carTypeOne?.numberOfBaggages,
              }
            : {}
        }
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <S.FormContent>
          <BaseForm.Item
            name="numberOfSeats"
            label={'numberOfSeats'}
            rules={[
              { required: true, message: 'filed is required' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error('filed is required'));
                  }
                  if (getFieldValue('numberOfSeats') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('error from numberOfSeats!'));
                },
              }),
            ]}
          >
            <Input placeholder="Enter name ?" />
          </BaseForm.Item>

          <BaseForm.Item
            name="numberOfBaggages"
            label={'numberOfBaggages'}
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <Input placeholder="Enter numberOfBaggages ?" />
          </BaseForm.Item>

          <PrimaryBtn htmlType="submit" loading={type === 'create' ? loading.post : loading.patch}>
            {type === 'create' ? 'create' : 'edit'}
          </PrimaryBtn>
        </S.FormContent>
      </BaseForm>
    </>
  );
};
