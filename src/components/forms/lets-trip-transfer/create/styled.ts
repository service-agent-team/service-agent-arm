import { FONT_SIZE, FONT_WEIGHT } from '@/common/styles';
import { Steps as AntdSteps, Button } from 'antd';
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

export const Block = styled.div`
  width: 100%;
  & div {
    width: 100%;
  }
`;
