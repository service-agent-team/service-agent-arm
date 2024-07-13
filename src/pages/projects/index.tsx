import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { ProjectCard } from '@/components/cards/project-card';
import { Col, Row, Skeleton } from 'antd';
import { useEffect } from 'react';
import { Title, Wrapper, Shadow } from './projects.styles';
import { UserPermission, UserRoles } from '@/types';
import { useNavigate } from 'react-router-dom';

export const ProjectsPage = () => {
  const { getMe } = useActions();
  const navigate = useNavigate();
  const {
    user,
    loading: { get },
  } = useTypedSelector((state) => state.auth);
  const isSupperAdmin = user?.userRoles?.find(
    (el: UserRoles) => el.user_role_name === 'superadmin',
  );

  useEffect(() => {
    getMe({
      callback: () => {
        addNotification('Successfully logged!');
      },
    });
  }, []);

  if (user?.userPermission?.length === 1)
    navigate(`${user.userPermission[0].project_id.project_name}/home`);

  return (
    <Wrapper>
      <Title>YOUR PROJECTS</Title>
      <Row gutter={[12, 12]} justify={'center'}>
        <Col>
          <Shadow>{!get && isSupperAdmin && <ProjectCard name="Global" path={`/global`} />}</Shadow>
        </Col>
        {!get &&
          user?.userPermission?.map((el: UserPermission, i: number) => (
            <Col key={i}>
              <Shadow>
                <Skeleton loading={get}>
                  <ProjectCard
                    name={el.project_id.project_name}
                    path={`/${el.project_id.project_name}/home`}
                  />
                </Skeleton>
              </Shadow>
            </Col>
          ))}
      </Row>
    </Wrapper>
  );
};
