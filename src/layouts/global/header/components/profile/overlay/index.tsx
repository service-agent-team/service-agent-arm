import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu } from '../../../styled';
import * as S from './styled';

export const ProfileOverlay: React.FC = ({ ...props }) => {
  return (
    <DropdownMenu selectable={false} {...props}>
      <S.MenuItem key={0}>
        <S.Text>
          <Link to="/profile">{'john'}</Link>
        </S.Text>
      </S.MenuItem>
      <S.ItemsDivider />
      <S.MenuItem key={1}>
        <S.Text>
          <Link to="/logout">{'logout'}</Link>
        </S.Text>
      </S.MenuItem>
    </DropdownMenu>
  );
};
