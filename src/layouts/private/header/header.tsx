import { LayoutHeader } from '../style';
import { Flex } from 'antd';
import { Icon } from '@/components';
import { HeaderProps } from '../type';
import { Breadcrumb } from './breadcrumb';
import { Dropdown } from './dropdown';
import { modal } from '@/app';
import { dictionary } from '../dictionary';
// import { useAppStore } from '@/store';

export const Header = ({ bg, collapsed, setCollapsed }: HeaderProps) => {
  // const { logout } = useAppStore();
  const handleClickMenu = () => setCollapsed(!collapsed);

  const handleClickLogout = () => {
    modal.confirm({
      title: dictionary.modal[0],
      onOk() {
        // logout();
      },
    });
  };

  return (
    <>
      <LayoutHeader $bg={bg}>
        <Flex align="center" gap="middle">
          <Icon
            btn
            name={collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'}
            onClick={handleClickMenu}
          />

          <Breadcrumb />
        </Flex>

        <Flex gap="small">
          <Dropdown>
            <Icon btn name="FormatPainterOutlined" />
          </Dropdown>

          <Icon btn name="LogoutOutlined" onClick={handleClickLogout} />
        </Flex>
      </LayoutHeader>
    </>
  );
};
