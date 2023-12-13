import { LayoutContent } from '../style';
import { Outlet } from 'react-router-dom';

export const Content = ({ bg }: { bg: string }) => (
  <LayoutContent $bg={bg}>{<Outlet />}</LayoutContent>
);
