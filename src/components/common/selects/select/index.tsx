import { Select as AntSelect } from 'antd';
import { RefSelectProps } from 'antd/lib/select';
import React, { ComponentProps } from 'react';
import * as S from './styled';

export const { Option } = AntSelect;

export interface SelectProps extends ComponentProps<typeof AntSelect>, S.SelectProps {
  className?: string;
}

export const Select = React.forwardRef<RefSelectProps, SelectProps>(
  ({ className, width, children, ...props }, ref) => (
    <S.Select
      getPopupContainer={(triggerNode) => triggerNode}
      ref={ref}
      className={className}
      width={width}
      {...props}
    >
      {children}
    </S.Select>
  ),
);
