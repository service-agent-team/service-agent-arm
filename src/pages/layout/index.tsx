import { globalLayoutitems } from '@/constants';
import { MainLayout } from '@/layouts';
import { Outlet } from 'react-router-dom';

export const GlobalLayout = () => {
  return (
    <MainLayout items={globalLayoutitems}>
      <Outlet />
    </MainLayout>
  );
};
