import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { BaseForm, PrimaryBtn, TextArea } from '@/components';
import { ROUTES } from '@/constants';
import { Col, Input, Row } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IValues } from './types';

export const ProcessProjectForm = ({ type }: { type: 'edit' | 'create' }) => {
  const [form] = BaseForm.useForm();
  const { createProcessProject, updateProcessProject, getOneProcessProject } = useActions();
  const navigate = useNavigate();
  const { project, loading } = useTypedSelector((s) => s.processProject);
  const { id } = useParams();

  const onFinish = ({ name, description }: IValues) => {
    if (type === 'create') {
      createProcessProject({
        cb() {
          addNotification('Successfully added project');
          navigate(ROUTES.processProject);
        },
        body: {
          name,
          description,
        },
      });
    } else if (type === 'edit') {
      updateProcessProject({
        cb() {
          addNotification('Successfully edited project');
          navigate(ROUTES.processProject);
        },
        id: Number(id),
        body: {
          name,
          description,
        },
      });
    }
  };

  useEffect(() => {
    if (id) {
      getOneProcessProject({ id: Number(id) });
    }
  }, [id]);

  useEffect(() => {
    if (type === 'edit' && project) {
      form.setFieldsValue({
        name: project?.name,
        description: project?.description,
      });
    }
  }, [project]);

  return (
    <BaseForm form={form} layout="vertical" onFinish={onFinish} onFinishFailed={() => {}}>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <BaseForm.Item name="name" label={'Project name'} rules={[{ required: true }]}>
            <Input placeholder="Enter facility name ?" />
          </BaseForm.Item>
        </Col>

        <Col span={24}>
          <BaseForm.Item
            name="description"
            label="Project description"
            rules={[{ required: true }]}
          >
            <TextArea placeholder="Description" />
          </BaseForm.Item>
        </Col>

        <Col span={24}>
          <PrimaryBtn htmlType="submit" loading={loading.post}>
            {type}
          </PrimaryBtn>
        </Col>
      </Row>
    </BaseForm>
  );
};
