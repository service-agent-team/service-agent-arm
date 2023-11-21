import { ROUTES } from '@/constants';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = ({ isAuth }: { isAuth: boolean }) =>
  isAuth ? <Outlet /> : <Navigate to={ROUTES.signIn} />;
