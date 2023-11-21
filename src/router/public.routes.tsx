import { ContentCenter } from '@/components';
import { ROUTES } from '@/constants';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoutes = ({ isAuth }: { isAuth: boolean }) =>
  isAuth ? (
    <Navigate to={ROUTES.home} />
  ) : (
    <ContentCenter className={''}>
      <Outlet />
    </ContentCenter>
  );
