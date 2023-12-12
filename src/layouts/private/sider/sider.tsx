import { logo } from '@/assets';
import { Flex, Layout, Typography } from 'antd';
import { dictionary } from '../dictionary';
import { Menu } from './menu';

export const Sider = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <Layout.Sider
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ height: '100vh', padding: '10px 0' }}
    >
      <Flex justify="center" align="center" gap={12}>
        <img src={logo} height={40} width={40} />

        {!collapsed && <Typography>{dictionary.title}</Typography>}
      </Flex>

      <Menu />
    </Layout.Sider>
  );
};
