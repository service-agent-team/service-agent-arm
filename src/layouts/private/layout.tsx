import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Layout as AntLayout, theme } from 'antd';
import { Sider } from './sider';
import { Header } from './header';
import { Content } from './content';
import { Float } from './float';
import { ROUTES } from '@/constants';

export const Layout = () => {
  const isAuth = true;
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
