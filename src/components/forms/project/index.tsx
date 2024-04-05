import { BaseForm, Input, PrimaryBtn } from '@/components';
import { IValues } from './types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const ProjectForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createProject, updateProject } = useActions();
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
          addNotification('successfully update project !');
          navigate(ROUTES.projects);
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
        initialValue={project?.project_name}
        rules={[
          { required: true, type: 'string', message: 'project name field is required' },
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
        <Input placeholder="Enter project name ?" />
      </BaseForm.Item>

      <BaseForm.Item
        name="projectDescription"
        label={'project description'}
        initialValue={project?.project_description}
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
        <Input placeholder="Enter project description ?" />
      </BaseForm.Item>
      <PrimaryBtn htmlType="submit" loading={type === 'edit' ? loading.put : loading.post}>
        {type === 'create' ? 'create' : 'edit'}
      </PrimaryBtn>
    </BaseForm>
  );
};
