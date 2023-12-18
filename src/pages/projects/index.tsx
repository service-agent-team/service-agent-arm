import { ProjectCard } from '@/components/cards/projectCard';
import { Wrapper } from './projects.styles';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { UserPermission } from '@/store/users/types';

export const ProjectsPage = () => {
  const { getMe } = useActions();
  useEffect(() => {
    getMe({
      callback: () => {
        addNotification('Successfuliy!');
      },
    });
  }, []);

  const { user } = useTypedSelector((state) => state.user);

  return (
    <Wrapper>
      {user?.userPermission.map((el: UserPermission, i: number) => (
        <ProjectCard key={i} name={el.project_id.project_name} path="/agent" />
      ))}
    </Wrapper>
  );
};
