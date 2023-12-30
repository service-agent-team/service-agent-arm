import { DropdownCollapse } from '@/layouts/global/header/styled';
import React from 'react';
import { ThemePicker } from '../theme-picker';
import * as S from './styled';

export const SettingsOverlay: React.FC = ({ ...props }) => {
  return (
    <S.SettingsOverlayMenu mode="inline" selectable={true} {...props}>
      <DropdownCollapse
        bordered={false}
        expandIconPosition="right"
        ghost
        defaultActiveKey="themePicker"
      >
        <DropdownCollapse.Panel header={'Change theme'} key="themePicker">
          <ThemePicker />
        </DropdownCollapse.Panel>
      </DropdownCollapse>
    </S.SettingsOverlayMenu>
  );
};
