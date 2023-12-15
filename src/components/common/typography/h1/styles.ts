import { media } from '@/constants';
import { Typography } from 'antd';
import styled from 'styled-components';

export const Text = styled(Typography.Title)`
  &.ant-typography {
    font-weight: 700;
    font-size: 1.125rem;
    margin-bottom: 0;

    @media only screen and ${media.md} {
      font-size: 1.5rem;
    }

    @media only screen and ${media.xl} {
      font-size: 2.25rem;
    }
  }
`;
