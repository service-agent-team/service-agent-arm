import { Layout as AntLayout, theme } from 'antd';
import { useState } from 'react';
import { Content } from './content';
import { Float } from './float';
import { Header } from './header';
import { Sider } from './sider';

export const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntLayout>
      <Sider collapsed={collapsed} />

      <AntLayout>
        <Header bg={colorBgContainer} collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content bg={colorBgContainer} />
      </AntLayout>

      <Float />
    </AntLayout>
  );
};
