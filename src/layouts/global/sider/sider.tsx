import { Divider, Flex, Layout, Typography } from 'antd';
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
      style={{ height: '97vh', padding: '10px 0' }}
    >
      <Flex justify="center" align="center" gap={12}>
        <img src={conf.logo} height={50} width={60} />

        {!collapsed && <Typography>{conf.name}</Typography>}
      </Flex>
      <Divider />
      <Menu />
    </Layout.Sider>
  );
};
