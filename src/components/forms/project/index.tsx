import { BaseForm, Input, PrimaryBtn } from '@/components';
import { IValues } from './types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { updateProject } from '@/store/global/project/actions';

export const ProjectForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createProject } = useActions();
  const { loading, project } = useTypedSelector((state) => state.project);
  const navigate = useNavigate();
  const { id } = useParams();

  const onFinish = ({ projectName, projectDescription }: IValues) => {
    if (type === 'create') {
      createProject({
        projectName,
        projectDescription,
        status: true,
        callback() {
          addNotification('successfully create project !');
          navigate(ROUTES.projects);
        },
      });
      form.resetFields();
    } else if (type === 'edit') {
      updateProject({
        id: Number(id),
        projectName,
        projectDescription,
        status: true,
        callback() {
          addNotification('successfully delete project !');
        },
      });
      form.resetFields();
    }
  };

  return (
    <BaseForm name="projectForm" form={form} layout="vertical" onFinish={onFinish}>
      <BaseForm.Item
        name="projectName"
        label={'project name'}
        rules={[
          { required: true, type: 'string', message: 'filed is required' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value) {
                return Promise.reject(new Error('filed is required'));
              }
              if (getFieldValue('projectName') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('error from project name!'));
            },
          }),
        ]}
      >
        <Input
          defaultValue={type === 'edit' ? project?.project_name : ''}
          placeholder="Enter project name ?"
        />
      </BaseForm.Item>

      <BaseForm.Item
        name="projectDescription"
        label={'project description'}
        rules={[
          { required: true, type: 'string', message: 'filed is required' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value) {
                return Promise.reject(new Error('filed is required'));
              }
              if (getFieldValue('projectDescription') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('error from project description!'));
            },
          }),
        ]}
      >
        <Input
          defaultValue={type === 'edit' ? project?.project_description : ''}
          placeholder="Enter project description ?"
        />
      </BaseForm.Item>
      <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.put : loading.post}>
        {type === 'create' ? 'create' : 'edit'}
      </PrimaryBtn>
    </BaseForm>
  );
};
