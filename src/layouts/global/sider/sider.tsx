import { logo } from '@/assets';
import { Flex, Layout, Typography } from 'antd';
import { dictionary } from '../dictionary';
import { Menu } from './menu';
interface IProps {
  collapsed: boolean;
  conf: any;
}
export const Sider = ({ collapsed, conf }: IProps) => {
  return (
    <Layout.Sider
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ height: '100vh', padding: '10px 0' }}
    >
      <Flex justify="center" align="center" gap={12}>
        <img src={conf.logo} height={50} width={60} />

        {!collapsed && <Typography>{conf.name}</Typography>}
      </Flex>

      <Menu />
    </Layout.Sider>
  );
};
