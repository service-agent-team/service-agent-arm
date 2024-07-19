import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { ProjectCard } from '@/components/cards/project-card';
import { UserPermission, UserRoles } from '@/types';
import { Col, Row, Skeleton } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shadow, Title, Wrapper } from './projects.styles';

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
      <Row gutter={[12, 12]} justify={'start'}>
        <Col span={8} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
          <Skeleton loading={get}>
            <Shadow>
              {!get && isSupperAdmin && <ProjectCard name="Global" path={`/global`} />}
            </Shadow>
          </Skeleton>
        </Col>
        {user?.userPermission?.map((el: UserPermission, i: number) => (
          <Col
            span={8}
            key={i}
            xs={{ order: 1 }}
            sm={{ order: 2 }}
            md={{ order: 3 }}
            lg={{ order: 4 }}
          >
            <Skeleton loading={get}>
              <Shadow>
                <Skeleton loading={get}>
                  <ProjectCard
                    name={el.project_id.project_name}
                    path={`/${el.project_id.project_name}/home`}
                  />
                </Skeleton>
              </Shadow>
            </Skeleton>
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};
