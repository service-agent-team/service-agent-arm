import { PageTitle, ProjectForm } from '@/components';
import { ROUTES } from '@/constants';

export const ProjectEdit = () => {
  return (
    <>
      <PageTitle
        label="Back"
        title="Edit project"
        icon="RollbackOutlined"
        route={ROUTES.projects}
      />
      <ProjectForm type="edit" />
    </>
  );
};
