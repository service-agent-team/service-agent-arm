import { media } from '@/common/styles';
import { MenuItem as MenuItemBase } from '@/components';
import { Divider, Typography } from 'antd';
import styled from 'styled-components';

export const Text = styled(Typography.Text)`
  font-size: 0.875rem;
  font-weight: 600;

  & > a {
    display: block;
  }

  @media only screen and ${media.md} {
    font-size: 1rem;
  }
`;

export const MenuItem = styled(MenuItemBase)`
  height: 30px;
`;

export const ItemsDivider = styled(Divider).withConfig({
  shouldForwardProp: (prop) => !['eventKey', 'warnKey'].includes(prop),
})`
  margin: 0;
  padding: 0;
`;
