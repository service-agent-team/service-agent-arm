import { Icon } from '@/components';
import { Dropdown } from 'antd';
import { MenuProps } from 'antd/lib';
import React from 'react';
import { ProfileOverlay } from '../overlay';

export const ProfileDropdown: React.FC = () => {
  const items: MenuProps['items'] = [
    {
      key: 1,
      label: <ProfileOverlay />,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Icon btn name="UserOutlined" />
    </Dropdown>
  );
};
