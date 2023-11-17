/* eslint-disable prettier/prettier */
import { history } from '@/libs';
import { generateAllMenuItems } from '@/libs/utils';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { ReactNode, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './layout.scss';

interface LayoutPropsType {
  items: MenuProps['items'];
  children: ReactNode;
}

export function MainLayout({ items, children }: LayoutPropsType) {
  const { pathname } = useLocation();
  const mainMenuItems = generateAllMenuItems(items);

  const handleClick = ({ key, domEvent }: any) => {
    domEvent.preventDefault();
    domEvent.stopPropagation();
    history.push(key);
  };

  const selectedMenuOpenKeyList = useMemo(() => pathname.split('/'), [pathname]);

  const selectedMenuOpenKey = useMemo(
    () => (selectedMenuOpenKeyList.length ? `/${selectedMenuOpenKeyList[1]}` : ''),
    [selectedMenuOpenKeyList],
  );
  return (
    <Layout className="layout">
      <Layout.Header>
        <div className="layout__head">
          <p className="layout__head__logo">SERVICE AGENT</p>
          <ul className="layout__head__nav">
            <Link to="/projects" className="layout__head__nav__link">
              projects
            </Link>
            <div className="layout__head__nav__account">
              <UserOutlined />
            </div>
          </ul>
        </div>
      </Layout.Header>
      <Layout>
        <Layout.Sider
          style={{
            overflow: 'auto',
            height: '90vh',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedMenuOpenKey]}
            defaultOpenKeys={[selectedMenuOpenKey]}
            defaultSelectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={mainMenuItems}
            onClick={handleClick}
          />
        </Layout.Sider>
        <Layout>
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
