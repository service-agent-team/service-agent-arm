import { Tabs } from 'antd';
import styled from 'styled-components';

export const CustomTabs = styled(Tabs)`
  & .ant-tabs-nav::before {
    display: none !important;
  }
`;
