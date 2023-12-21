import { ROUTES } from '@/constants';
import { menuItems } from '@/constants/menus/menu';
import { useActions } from '@/libs';
import { Navigate, Outlet } from 'react-router-dom';

export const Layout = ({ isAuth }: { isAuth: boolean }) => {
  const { setMenu } = useActions();
  setMenu(menuItems);
  return isAuth ? <Outlet /> : <Navigate to={ROUTES.login} />;
};
