import { FONT_SIZE } from '@/common/styles';
import { Table as AntdTable } from 'antd';
import styled from 'styled-components';

export const Table = styled(AntdTable)`
  & .ant-spin-container .ant-table .ant-table-bordered .ant-table-wrapper {
    max-width: 100%;
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
  }

  & thead .ant-table-cell {
    color: var(--primary-color);
    font-size: ${FONT_SIZE.xs};
    line-height: 1.25rem;

    & .anticon {
      color: var(--primary-color);
    }
  }

  & tbody .ant-table-cell {
    color: var(--text-main-color);
    font-size: ${FONT_SIZE.xs};
    line-height: 1.25rem;
  }

  // Override default antd selector
  &
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not(
      [colspan]
    )::before {
    background-color: var(--primary-color);
  }

  & .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next,
  .ant-pagination-item {
    min-width: 2.0625rem;
    height: 2.0625rem;
    line-height: 2.0625rem;
    border-radius: 0;
    font-size: ${FONT_SIZE.xs};
  }

  & .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    border-radius: 0;
  }

  & .ant-table-pagination {
    margin-top: auto;
  }

  & .ant-checkbox-inner {
    border-radius: 0.1875rem;
    height: 1.25rem;
    width: 1.25rem;
    border: 1px solid var(--primary-color);
  }

  & .editable-row .ant-form-item-explain {
    position: absolute;
    top: 100%;
    font-size: 0.75rem;
  }

  .ant-table-column-sort {
    background-color: transparent;
  }

  .ant-pagination-item-container .ant-pagination-item-ellipsis {
    color: var(--disabled-color);
  }

  .ant-pagination-disabled {
    .ant-pagination-item-link,
    .ant-pagination-item a {
      color: var(--disabled-color);
    }
  }

  .ant-pagination.ant-pagination-disabled {
    .ant-pagination-item-link,
    .ant-pagination-item a {
      color: var(--disabled-color);
    }
  }
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
`;
