import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import { StyleProps } from './type';

export const LayoutSider = styled(Layout.Sider)`
  height: 100vh;
  padding: 10px 0;
`;

export const LayoutHeader = styled(Layout.Header)<StyleProps>`
  align-items: center;
  background: ${({ $bg }) => $bg};
  display: flex;
  justify-content: space-between;
  padding: 0 18px;
  border-radius: 20px;
  margin: 0 10px;
  margin-top: 5px;
`;

export const LayoutContent = styled(Layout.Content)<StyleProps>`
  background: ${({ $bg }) => $bg};
  height: 85vh;
  margin: var(--base);
  overflow-y: auto;
  padding: var(--base);
  border-radius: 20px;
`;

export const AntMenu = styled(Menu)`
  border: none !important;
  margin-top: 10px;
`;
