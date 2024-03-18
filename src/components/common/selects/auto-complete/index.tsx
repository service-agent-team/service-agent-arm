import { AutoComplete as AntAutoComplete } from 'antd';
import { RefSelectProps } from 'antd/lib/select';
import React, { ComponentProps } from 'react';
import * as S from './styled';

export const { Option } = AntAutoComplete;

export interface SelectProps extends ComponentProps<typeof AntAutoComplete>, S.SelectProps {
  className?: string;
}

export const AutoComplete = React.forwardRef<RefSelectProps, SelectProps>(
  ({ className, width, children, filterOption, ...props }, ref) => (
    <S.Select
      getPopupContainer={(triggerNode) => triggerNode}
      ref={ref}
      className={className}
      width={width}
      filterOption={filterOption}
      {...props}
    >
      {children}
    </S.Select>
  ),
);
