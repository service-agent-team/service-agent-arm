import { useActions, useTypedSelector } from '@/hooks';
import { Dropdown as AntDropdown, MenuProps, Radio } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { PropsWithChildren } from 'react';
import { dropDownMenu } from '../constants';

export const Dropdown = ({ children }: PropsWithChildren) => {
  const { theme } = useTypedSelector((state) => state.app);
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
