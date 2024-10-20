import { useActions, useTypedSelector } from '@/common/hooks';
import { Icon } from '@/components';
import { modal } from '@/components/app';
import { dictionary } from '@/layouts/global/dictionary';
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { DropdownMenu } from '../../../styled';
import * as S from './styled';

export const ProfileOverlay: React.FC = ({ ...props }) => {
  const { logout } = useActions();
  const { user } = useTypedSelector((state) => state.auth);

  const handleClickLogout = () => {
    modal.confirm({
      title: dictionary.modal[0],
      onOk() {
        logout();
      },
    });
  };

  return (
    <DropdownMenu selectable={false} {...props}>
      <S.MenuItem key={0}>
        <S.Text>{user?.email}</S.Text>
      </S.MenuItem>
      <S.ItemsDivider />
      <S.MenuItem key={1}>
        <Button
          color={'red'}
          style={{ width: '100%' }}
          icon={<LogoutOutlined />}
          onClick={handleClickLogout}
        >
          logout
        </Button>
        <Icon btn name="LogoutOutlined" />
      </S.MenuItem>
    </DropdownMenu>
  );
};
