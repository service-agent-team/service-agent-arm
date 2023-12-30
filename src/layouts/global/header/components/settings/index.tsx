import { Dropdown, Icon } from '@/components';
import { MenuProps } from 'antd';
import React, { useState } from 'react';
import { SettingsOverlay } from './overlay/setings';

export const SettingsDropdown: React.FC = () => {
  const [opened, setOpened] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: <SettingsOverlay />,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} open={opened} onOpenChange={setOpened}>
      <Icon btn name="SettingOutlined" />
    </Dropdown>
  );
};
