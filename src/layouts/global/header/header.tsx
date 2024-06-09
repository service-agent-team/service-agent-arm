import { Icon } from '@/components';
import { Flex } from 'antd';
import { LayoutHeader } from '../style';
import { HeaderProps } from '../type';
import { Breadcrumb } from './breadcrumb';
import { BackButton, HeaderFullscreen, ProfileDropdown, SettingsDropdown } from './components';

export const Header = ({ bg, collapsed, setCollapsed }: HeaderProps) => {
  const handleClickMenu = () => setCollapsed(!collapsed);

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
          <BackButton />
          <HeaderFullscreen />
          <SettingsDropdown />
          <ProfileDropdown />
        </Flex>
      </LayoutHeader>
    </>
  );
};
