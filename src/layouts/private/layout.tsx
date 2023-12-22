import { ROUTES } from '@/constants';
import { Navigate, Outlet } from 'react-router-dom';

export const Layout = ({ isAuth }: { isAuth: boolean }) => {
  return isAuth ? <Outlet /> : <Navigate to={ROUTES.login} />;
};
