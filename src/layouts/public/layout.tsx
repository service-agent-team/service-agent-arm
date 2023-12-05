import { StyledLayout } from './style';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const Layout = () => {
  const isAuth = true;

  return isAuth ? (
    <Navigate to={ROUTES.home} />
  ) : (
    <StyledLayout>
      <Outlet />
    </StyledLayout>
  );
};
