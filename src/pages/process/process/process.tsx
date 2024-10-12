import { FC, useEffect, useRef, useState, WheelEvent } from 'react';
import { ProcessPayload } from './payload';
import * as S from './styled';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { BaseForm } from '@/components';
import { IProcessBody } from '@/store/process/diagram/types';
import { addNotification } from '@/common';
// @ts-ignore
import { store } from 'sequence-diagram-react';
import { ROUTES } from '@/constants';

interface IProps {
  type: 'edit' | 'create';
}

export const ProcessDiagram: FC<IProps> = ({ type }: IProps) => {
  const {
    process,
    loading: { post },
  } = useTypedSelector((s) => s.process);
  const { getOneProcess, createProcess, updateProcess } = useActions();
  const { diagramId, id } = useParams();
  const [form] = BaseForm.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (diagramId) {
      getOneProcess({
        id: Number(diagramId),
        cb: () => {},
      });
    }
  }, [diagramId, id, type]);

  useEffect(() => {
    if (process) {
      form.setFieldsValue({
        name: process.name,
      });
    }
  }, [process]);

  const onFinish = ({ name }: IProcessBody) => {
    const diagram = store.getState().core.present;

    if (diagram) {
      if (type === 'create') {
        createProcess({
          body: { name, diagram, project: Number(id) },
          cb: () => {
            addNotification('Successfully created process');
            navigate(ROUTES.processProject);
          },
        });
      }

      if (type === 'edit') {
        updateProcess({
          id: Number(diagramId),
          body: { name, diagram, project: Number(id) },
          cb: () => {
            addNotification('Successfully updated process');
          },
        });
      }
    }
  };

  return (
    <S.Block>
      <BaseForm form={form} onFinish={onFinish}>
        <BaseForm.Item name="name" label="Process name" rules={[{ required: true }]}>
          <S.Input placeholder="Enter process name ?" />
        </BaseForm.Item>
        <ProcessPayload type={type} />
        <S.Button htmlType="submit" type="primary" loading={post}>
          Save
        </S.Button>
      </BaseForm>
    </S.Block>
  );
};
