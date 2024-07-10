import { BaseForm, Input, PrimaryBtn } from '@/components';
import * as S from './styled';
import { IValuesForm } from './types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const AgentProjectForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createAgentProjectByAgent, editAgentProjectByAgent } = useActions();
  const {
    agentProject,
    loading: { post },
  } = useTypedSelector((state) => state.agentProject);
  const { id } = useParams();
  const navigate = useNavigate();

  const onFinish = ({ name, description }: IValuesForm) => {
    if (type === 'create') {
      createAgentProjectByAgent({
        name,
        description,
        callback() {
          navigate(ROUTES.agentProject);
          addNotification('successfully created agent project');
        },
      });
      form.resetFields();
    } else if (type === 'edit') {
      editAgentProjectByAgent({
        name,
        description,
        callback() {
          navigate(ROUTES.agentProject);
          addNotification('successfully edited agent project');
        },
        id: id as string,
      });
      form.resetFields();
    }
  };
  ('#3a57e86d');

  return (
    <BaseForm
      name="AgentProjectForm"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={
        type === 'edit'
          ? {
              name: agentProject?.name,
              description: agentProject?.description,
            }
          : {}
      }
    >
      <S.FormContent>
        <BaseForm.Item
          name="name"
          label={'name'}
          rules={[{ required: true, message: 'name is required!' }]}
        >
          <Input placeholder="Enter project name" />
        </BaseForm.Item>
        <BaseForm.Item
          name="description"
          label={'description'}
          rules={[{ required: true, message: 'description is required!' }]}
        >
          <Input placeholder="Enter project description" />
        </BaseForm.Item>
        <PrimaryBtn htmlType="submit" loading={post}>
          {type === 'edit' ? 'edit' : 'create'}
        </PrimaryBtn>
      </S.FormContent>
    </BaseForm>
  );
};
