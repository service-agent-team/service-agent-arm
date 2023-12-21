import { AntMenu } from '@/layouts/global/style';
import { generateMenuIconCreator, history, useTypedSelector } from '@/libs';
import { MenuProps } from 'antd';
import { useLocation } from 'react-router-dom';
import { menuItems } from './constants';

export const Menu = () => {
  const { pathname } = useLocation();
  const { menu } = useTypedSelector((state) => state.app);
  const selectedMenuOpenKey = menu.find((item) => item.key === pathname)?.key || menuItems[0].key;

  const handleClick: MenuProps['onClick'] = ({ key, domEvent }) => {
    domEvent.preventDefault();
    domEvent.stopPropagation();
    history.push(key);
  };
  const menuitems = generateMenuIconCreator(menu);
  console.log(menuitems);
  return (
    <AntMenu
      mode="inline"
      theme="light"
      selectedKeys={[selectedMenuOpenKey]}
      openKeys={[selectedMenuOpenKey]}
      items={menuitems}
      onClick={handleClick}
    />
  );
};
