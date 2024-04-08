import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { ProjectCard } from '@/components/cards/project-card';
import { Skeleton } from 'antd';
import { useEffect } from 'react';
import { Title, Wrapper } from './projects.styles';
import { UserPermission, UserRoles } from '@/types';

export const ProjectsPage = () => {
  const { getMe } = useActions();
  useEffect(() => {
    getMe({
      callback: () => {
        addNotification('Successfuliy!');
      },
    });
  }, []);

  const {
    user,
    loading: { get },
  } = useTypedSelector((state) => state.auth);
  const isSupperAdmin = user?.userRoles?.find(
    (el: UserRoles) => el.user_role_name === 'superadmin',
  );
  return (
    <Wrapper>
      <Title>Sizning Proectlaringiz</Title>
      {!get && isSupperAdmin && <ProjectCard name="Global" path={`/global`} />}
      {!get &&
        user?.userPermission?.map((el: UserPermission, i: number) => (
          <Skeleton loading={get} key={i}>
            <ProjectCard
              key={i}
              name={el.project_id.project_name}
              path={`/${el.project_id.project_name}/home`}
            />
          </Skeleton>
        ))}
    </Wrapper>
  );
};
