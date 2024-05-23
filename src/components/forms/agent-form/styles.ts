import { FONT_SIZE, FONT_WEIGHT } from '@/common/styles';
import { Steps as AntdSteps, Button, Checkbox, Flex, TreeSelect } from 'antd';
import styled from 'styled-components';

export const Steps = styled(AntdSteps)`
  .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: var(--primary-color);
  }

  .ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: var(--subtext-color);
  }

  .ant-steps-item-wait .ant-steps-item-icon {
    border-color: var(--subtext-color);
    & > .ant-steps-icon {
      color: var(--subtext-color);
    }
  }

  & .ant-steps-item {
    &-description,
    &-subtitle {
      color: var(--subtext-color) !important;
    }
  }
`;

export const FormContent = styled.div`
  margin: 1.25rem 0.5rem;
`;

export const PrevButton = styled(Button)`
  margin: 0 0.5rem;
`;

export const Select = styled.div`
  width: 5.9375rem;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 1.25rem 0.5rem;
`;

export const DetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DetailsTitle = styled.div`
  color: var(--text-light-color);
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.semibold};
  margin-right: 0.5rem;
`;

export const DetailsValue = styled.div`
  color: var(--text-main-color);
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.semibold};
`;

export const ProjectButton = styled(Button)`
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
`;

export const ProjectCheckbox = styled(Checkbox)`
  width: 100%;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
`;

export const CustomTreeSelect = styled(TreeSelect)`
  height: auto;
`;

export const CustomFlex = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`;

export const CustomButton = styled(Button)`
  position: absolute;
  width: auto !important;
  margin-left: auto;
  right: 10px !important;
  bottom: 8px !important;
`;
