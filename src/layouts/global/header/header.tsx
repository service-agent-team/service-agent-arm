import { modal } from '@/app';
import { Icon } from '@/components';
import { useActions } from '@/libs';
import { Flex } from 'antd';
import { dictionary } from '../dictionary';
import { LayoutHeader } from '../style';
import { HeaderProps } from '../type';
import { Breadcrumb } from './breadcrumb';
import { HeaderFullscreen, ProfileDropdown, SettingsDropdown } from './components';
import { Dropdown } from './dropdown';

export const Header = ({ bg, collapsed, setCollapsed }: HeaderProps) => {
  const { logout } = useActions();
  const handleClickMenu = () => setCollapsed(!collapsed);

  const handleClickLogout = () => {
    modal.confirm({
      title: dictionary.modal[0],
      onOk() {
        logout();
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

          <HeaderFullscreen />
          <SettingsDropdown />

          <ProfileDropdown />
        </Flex>
      </LayoutHeader>
    </>
  );
};
