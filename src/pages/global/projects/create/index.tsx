import { PageTitle, ProjectForm } from '@/components';
import { ROUTES } from '@/constants';

export const ProjectCreate = () => {
  return (
    <>
      <PageTitle
        label="Back"
        title="Create project"
        icon="RollbackOutlined"
        route={ROUTES.projects}
      />

      <ProjectForm type="create" />
    </>
  );
};
