import { media } from '@/common/styles';
import { Typography } from 'antd';
import styled from 'styled-components';

export const BaseFormTitle = styled(Typography.Text)`
  font-weight: 700;
  font-size: 1rem;
  display: block;

  @media only screen and ${media.md} {
    font-size: 1.125rem;
  }
`;
