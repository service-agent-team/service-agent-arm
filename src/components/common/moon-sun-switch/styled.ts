import { Button } from 'antd';
import styled, { css } from 'styled-components';

interface BtnProps {
  $isFirstActive: boolean;
}

export const Btn = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  &.ant-btn-icon-only.ant-btn-sm {
    height: 1.875rem;
  }
`;

export const ButtonGroup = styled.div<BtnProps>`
  display: inline-flex;
  with: 50px;
  padding: 0.225rem;
  column-gap: 0.325rem;

  border-radius: 10px;

  background-color: #e7edf5;

  ${(props) =>
    props.$isFirstActive
      ? css`
          & > ${Btn}:first-of-type {
            background: #339cfd;
            color: #fff;
          }
        `
      : css`
          & > ${Btn}:last-of-type {
            background: #339cfd;
            color: #fff;
          }
        `}

  &:not(:last-of-type) {
    margin-bottom: 0.625rem;
  }
`;
