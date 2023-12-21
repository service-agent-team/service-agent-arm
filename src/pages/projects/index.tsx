import { ProjectCard } from '@/components/cards/project-card';
import { Title, Wrapper } from './projects.styles';
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
      <Title>Sizning Proectlaringiz</Title>
      {user?.userPermission.map((el: UserPermission, i: number) => (
        <ProjectCard
          key={i}
          name={el.project_id.project_name}
          path={`/${el.project_id.project_name}/home`}
        />
      ))}
    </Wrapper>
  );
};
