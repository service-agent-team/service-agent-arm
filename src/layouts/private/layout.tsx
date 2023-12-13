import { ROUTES } from '@/constants';
import { Navigate } from 'react-router-dom';

export const Layout = ({ isAuth }: { isAuth: boolean }) => {
  return isAuth ? (
    <>
      <h1>Projects Page</h1>
    </>
  ) : (
    <Navigate to={ROUTES.login} />
  );
};
