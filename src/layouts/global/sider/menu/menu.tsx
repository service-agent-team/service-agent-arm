import { AntMenu } from '@/layouts/global/style';
import { history } from '@/libs';
import { MenuProps } from 'antd';
import { useLocation } from 'react-router-dom';
import { menuItems } from './constants';

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
