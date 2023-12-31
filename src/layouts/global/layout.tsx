import { ROUTES } from '@/constants';
import { useActions } from '@/libs';
import { Layout as AntLayout, theme } from 'antd';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Content } from './content';
import { Header } from './header';
import { Sider } from './sider';

export type IProps = {
  isAuth: boolean;
  items: any;
};

export const Layout = ({ isAuth, items }: IProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { setMenu } = useActions();
  setMenu(items);

  return isAuth ? (
    <AntLayout>
      <Sider collapsed={collapsed} />

      <AntLayout>
        <Header bg={colorBgContainer} collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content bg={colorBgContainer} />
      </AntLayout>
    </AntLayout>
  ) : (
    <Navigate to={ROUTES.login} />
  );
};
