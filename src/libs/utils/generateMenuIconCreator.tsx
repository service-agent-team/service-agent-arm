import { IMenu } from '@/store/app/types';
import { Icon } from '@/components';

export const IconComponet = (name: string) => <Icon name={name} />;
export const generateMenuIconCreator = (menus: IMenu[]) => {
  return menus.map((el: IMenu) => ({ key: el.key, label: el.label, icon: IconComponet(el.icon) }));
};
