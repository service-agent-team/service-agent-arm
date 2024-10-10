import styled from 'styled-components';
import { Button as AntBtn, Input as AntInput } from 'antd';

export const Block = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Input = styled(AntInput)`
  margin-bottom: 15px;
`;

export const Button = styled(AntBtn)`
  width: 100%;
`;
