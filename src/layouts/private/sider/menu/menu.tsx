import { useLocation } from 'react-router-dom';
import { AntMenu } from '@/layouts/private/style';
import { MenuProps } from 'antd';
import { menuItems } from './constants';
import { history } from '@/libs';

export const Menu = () => {
  const { pathname } = useLocation();
  const selectedMenuOpenKey =
    menuItems.find((item) => item.key === pathname)?.key || menuItems[0].key;

  const handleClick: MenuProps['onClick'] = ({ key, domEvent }) => {
    domEvent.preventDefault();
    domEvent.stopPropagation();
    history.push(key);
  };

  return (
    <AntMenu
      mode="inline"
      theme="light"
      selectedKeys={[selectedMenuOpenKey]}
      openKeys={[selectedMenuOpenKey]}
      items={menuItems}
      onClick={handleClick}
    />
  );
};
