import { addNotification } from '@/common/utils/addNotification';
import { ProjectCard } from '@/components/cards/project-card';
import { useActions, useTypedSelector } from '@/hooks';
import { UserPermission } from '@/store/users/types';
import { useEffect } from 'react';
import { Title, Wrapper } from './projects.styles';

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
      {user?.userRoles[0].user_role_name.includes('superadmin') && (
        <ProjectCard name="Global" path={`/global`} />
      )}
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
