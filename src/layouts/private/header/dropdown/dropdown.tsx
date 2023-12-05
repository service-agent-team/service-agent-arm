import { PropsWithChildren } from 'react';
// import { useAppStore } from '@/store';
import { Dropdown as AntDropdown, MenuProps, Radio } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { dropDownMenu } from '../constants';

export const Dropdown = ({ children }: PropsWithChildren) => {
  // const { theme, setTheme } = useAppStore();

  const handleChangeRadio = (e: CheckboxChangeEvent) => {
    // setTheme(e.target.value);
  };

  const items: MenuProps['items'] = dropDownMenu.map((item, idx) => ({
    key: idx,
    label: (
      <Radio value={item.value} checked={item.value === 'light'} onChange={handleChangeRadio}>
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
