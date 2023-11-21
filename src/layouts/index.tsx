/* eslint-disable prettier/prettier */
import type { MenuProps } from 'antd';
import { Layout } from 'antd';
import { ReactNode } from 'react';
import { Header } from './Header';
import { Menu } from './Menu';
import './layout.scss';

interface LayoutPropsType {
  items: MenuProps['items'];
  children: ReactNode;
}

export function MainLayout({ items, children }: LayoutPropsType) {
  return (
    <Layout className="layout">
      <Header />
      <Layout>
        <Layout.Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Menu items={items} />
        </Layout.Sider>
        <Layout>
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
