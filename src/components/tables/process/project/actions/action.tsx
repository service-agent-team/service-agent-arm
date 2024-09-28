import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Icon, modal } from '@/components';
import { IProcessProject } from '@/store/process/project/types';
import { Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Actions = ({ record }: { record: IProcessProject }) => {
  const { deleteProcessProject, setProcessProjects } = useActions();
  const { projects } = useTypedSelector((s) => s.processProject);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`${record.id}`);
  };

  const handleDelete = () => {
    return modal.confirm({
      okText: 'Delete',
      title: `Are you sure you want to delete this project?`,
      onOk: () => {
        deleteProcessProject({
          cb() {
            addNotification('Project deleted successfully');
            setProcessProjects(projects?.filter((p) => p.id !== record.id));
          },
          id: record.id,
        });
      },
    });
  };

  return (
    <Flex gap="middle" justify="center">
      <Icon btn name="EditOutlined" type="primary" onClick={handleEdit} />
      <Icon danger btn name="DeleteOutlined" type="primary" onClick={handleDelete} />
    </Flex>
  );
};
