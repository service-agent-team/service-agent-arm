import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { BaseForm, PrimaryBtn, Select } from '@/components';
import { Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from '../users-form/styled';
import { IAgentPermissionValues } from './types';

export const AgentPermissionForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createAgentPermission, editAgentPermission } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading } = useTypedSelector((state) => state.roles);

  const onFinish = (value: IAgentPermissionValues) => {
    if (type === 'create') {
      createAgentPermission({
        name: value.name,
        description: value.description,
        type: value.type,
        callback: () => {
          addNotification('created !');
          navigate('/service-agent/permissions');
        },
      });
      form.resetFields();
    } else if (type === 'edit') {
      editAgentPermission({
        id: id as string,
        name: value.name,
        description: value.description,
        type: value.type,
        callback: () => {
          addNotification('edited !');
          navigate('/service-agent/permissions');
        },
      });
    }
  };

  const typeOptions = [
    { label: 'FOR_USER_ROLE', value: 'FOR_USER_ROLE' },
    { label: 'FOR_USER_TARIFF', value: 'FOR_USER_PROJECT' },
    { label: 'FOR_USER_PROJECT', value: 'FOR_USER_PROJECT' },
  ];

  return (
    <>
      <BaseForm name="usersForm" form={form} layout="vertical" onFinish={onFinish}>
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

          <BaseForm.Item
            name="type"
            label={'type'}
            rules={[{ required: true, message: 'filed is required' }]}
          >
            <Select options={typeOptions} placeholder="Select permission type" />
          </BaseForm.Item>

          <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.patch : loading.post}>
            {type === 'create' ? 'create' : 'edit'}
          </PrimaryBtn>
        </S.FormContent>
      </BaseForm>
    </>
  );
};
