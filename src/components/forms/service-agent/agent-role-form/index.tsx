import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, PrimaryBtn } from '@/components';
import { Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from '../../global/users-form/styled';
import { ICreateRolesValues } from './types';

export const AgentRolesForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createRoles, editRoles } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, oneRole } = useTypedSelector((state) => state.roles);

  const onFinish = (value: ICreateRolesValues) => {
    if (type === 'create') {
      createRoles({
        name: value.name,
        description: value.description,
        callback: () => {
          addNotification('created !');
          navigate('/service-agent/roles');
        },
      });
      form.resetFields();
    } else if (type === 'edit') {
      editRoles({
        id: id as string,
        name: value.name,
        description: value.description,
        callback: () => {
          addNotification('edited !');
          navigate('/service-agent/roles');
        },
      });
    }
  };

  return (
    <>
      <BaseForm
        name="usersForm"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={
          type === 'edit'
            ? {
                name: oneRole?.name,
                description: oneRole?.description,
              }
            : {}
        }
      >
        <S.FormContent>
          <BaseForm.Item
            name="name"
            label={'name'}
            rules={[
              { required: true, message: 'filed is required' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error('filed is required'));
                  }
                  if (getFieldValue('name') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('error from NameUz!'));
                },
              }),
            ]}
          >
            <Input placeholder="Enter name ?" />
          </BaseForm.Item>

          <BaseForm.Item
            name="description"
            label={'description'}
            rules={[
              { required: true, type: 'string', message: 'filed is required' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error('filed is required'));
                  }
                  if (getFieldValue('description') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('error from NameUz!'));
                },
              }),
            ]}
          >
            <Input placeholder="Enter description ?" />
          </BaseForm.Item>

          <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.patch : loading.post}>
            {type === 'create' ? 'create' : 'edit'}
          </PrimaryBtn>
        </S.FormContent>
      </BaseForm>
    </>
  );
};
