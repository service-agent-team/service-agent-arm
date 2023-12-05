import { ROUTES } from '@/constants';
import { Layout as AntLayout, theme } from 'antd';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Content } from './content';
import { Float } from './float';
import { Header } from './header';
import { Sider } from './sider';

export const Layout = ({ isAuth }: { isAuth: boolean }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return isAuth ? (
    <AntLayout>
      <Sider collapsed={collapsed} />

      <AntLayout>
        <Header bg={colorBgContainer} collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content bg={colorBgContainer} />
      </AntLayout>

      <Float />
    </AntLayout>
  ) : (
    <Navigate to={ROUTES.login} />
  );
};
