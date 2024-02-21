import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, Loading, PrimaryBtn } from '@/components';
import { useActions, useTypedSelector } from '@/hooks';
import { Flex, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from '../users-form/styled';
import { ICreateTariffValues } from './types';

export const TariffForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createTariff, editTariff } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading } = useTypedSelector((state) => state.tariff);

  const onFinish = (value: ICreateTariffValues) => {
    if (type === 'create') {
      createTariff({
        minimumDuration: +value.minimumDuration,
        nameRu: value.nameRu,
        nameUz: value.nameUz,
        callback: () => {
          addNotification('successfully created tariff');
          navigate('/transfer/tariff');
        },
      });
      form.resetFields();
    } else if (type === 'edit') {
      editTariff({
        id: id as string,
        minimumDuration: +value.minimumDuration,
        nameRu: value.nameRu,
        nameUz: value.nameUz,
        callback: () => {
          addNotification('successfully eddited tariff');
          navigate('/transfer/tariff');
        },
      });
    }
  };

  return (
    <>
      {loading.get ? (
        <Flex>
          <Loading />
        </Flex>
      ) : (
        <BaseForm name="usersForm" form={form} layout="vertical" onFinish={onFinish}>
          <S.FormContent>
            <BaseForm.Item
              name="nameUz"
              label={'nameUz'}
              rules={[
                { required: true, message: 'filed is required' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(new Error('filed is required'));
                    }
                    if (getFieldValue('nameUz') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('error from NameUz!'));
                  },
                }),
              ]}
            >
              <Input placeholder="Enter NameUz ?" value="salom" />
            </BaseForm.Item>

            <BaseForm.Item
              name="nameRu"
              label={'nameRu'}
              rules={[
                { required: true, type: 'string', message: 'filed is required' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(new Error('filed is required'));
                    }
                    if (getFieldValue('nameRu') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('error from NameUz!'));
                  },
                }),
              ]}
            >
              <Input placeholder="Enter NameRu ?" />
            </BaseForm.Item>

            <Flex justify="space-between" gap={'10px'}>
              <BaseForm.Item
                style={{ width: '50%' }}
                name="minimumDuration"
                label={'minimumDuration'}
                rules={[{ required: true, message: 'filed is required' }]}
              >
                <Input placeholder="Enter minimumDuration ?" />
              </BaseForm.Item>
            </Flex>

            <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.patch : loading.post}>
              {type === 'create' ? 'create' : 'edit'}
            </PrimaryBtn>
          </S.FormContent>
        </BaseForm>
      )}
    </>
  );
};
