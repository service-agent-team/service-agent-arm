import { useActions, useAppSelector } from '@/libs';
import { appSelector } from '@/store/app';
import { PropsWithChildren } from 'react';
import { Dropdown as AntDropdown, MenuProps, Radio } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { dropDownMenu } from '../constants';

export const Dropdown = ({ children }: PropsWithChildren) => {
  const { theme } = useAppSelector(appSelector);
  const { setTheme } = useActions();

  const handleChangeRadio = (e: CheckboxChangeEvent) => {
    setTheme(e.target.value);
  };

  const items: MenuProps['items'] = dropDownMenu.map((item, idx) => ({
    key: idx,
    label: (
      <Radio value={item.value} checked={item.value === theme} onChange={handleChangeRadio}>
        {item.label}
      </Radio>
    ),
  }));

  return (
    <AntDropdown menu={{ items }} trigger={['click']}>
      {children}
    </AntDropdown>
  );
};
