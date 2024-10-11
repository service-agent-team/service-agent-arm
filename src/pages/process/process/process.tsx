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

  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

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

  const handleScroll = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    if (e.deltaY < 0) {
      // Scroll up
      setScale((prevScale) => Math.min(prevScale + zoomFactor, 3));
    } else {
      // Scroll down
      setScale((prevScale) => Math.max(prevScale - zoomFactor, 0.5));
    }
  };
  // Mouse down (bosilganda)
  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Mouse up (bosish tugashi)
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mouse movement (harakatlanish)
  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePosition.x;
    const dy = e.clientY - lastMousePosition.y;
    setTranslate((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <S.Block>
      <BaseForm form={form} onFinish={onFinish}>
        <BaseForm.Item name="name" label="Process name" rules={[{ required: true }]}>
          <S.Input placeholder="Enter process name ?" />
        </BaseForm.Item>
        <div
          ref={containerRef}
          onWheel={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            overflow: 'auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              transformOrigin: 'top left',
              transition: 'transform 0.1s',
            }}
          >
            <ProcessPayload type={type} />
          </div>
        </div>
        <S.Button htmlType="submit" type="primary" loading={post}>
          Save
        </S.Button>
      </BaseForm>
    </S.Block>
  );
};
