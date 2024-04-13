import { PageTitle, ProjectTable } from '@/components';
import { ROUTES } from '@/constants';

export const Projects = () => {
  return (
    <>
      <PageTitle
        title="Projects"
        icon="UserAddOutlined"
        route={ROUTES.projectCreate}
        label="Create"
      />
      <ProjectTable />
    </>
  );
};
