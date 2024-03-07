import { PageTitle, UsersForm } from '@/components';

export const EditUsers = () => {
  return (
    <>
      <PageTitle label="ortga " title="Update User" icon="RollbackOutlined" route="/global/users" />
      <UsersForm type={'edit'} />
    </>
  );
};
