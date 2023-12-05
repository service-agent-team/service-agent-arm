import { ROUTES } from '@/constants';
import { Navigate, Outlet } from 'react-router-dom';
import { StyledLayout } from './style';

export const Layout = ({ isAuth }: { isAuth: boolean }) => {
  return isAuth ? (
    <Navigate to={ROUTES.home} />
  ) : (
    <StyledLayout>
      <Outlet />
    </StyledLayout>
  );
};
