/* eslint-disable prettier/prettier */
import { serviceAgentMenu } from '@/constants/menus/service-agent';
import { MainLayout } from '@/layouts';
import { Outlet } from 'react-router-dom';
export function ServiceAgentLayout() {
  return (
    <MainLayout items={serviceAgentMenu}>
      <Outlet />
    </MainLayout>
  );
}
