import { Col, Input, InputProps, Switch, Select } from 'antd';
import { Rule } from 'antd/es/form';
import { FormItemProps } from 'antd/lib';
import { ReactNode } from 'react';
import { BaseForm } from '../base-form';
import { BaseOptionType } from 'antd/es/select';
import { InputNumber } from '../../inputs';

type TFieldProps = {
  span?: number;
  rule?: Rule[];
  textarea?: boolean;
  isRequired?: boolean;
  children?: ReactNode;
  isInputNumber?: boolean;
  isSwitch?: boolean;
  options?: BaseOptionType[];
} & Partial<FormItemProps & InputProps>;

export const Field = ({
  span,
  textarea,
  rule,
  isRequired = false,
  isInputNumber,
  children,
  isSwitch,
  options,
  ...props
}: TFieldProps) => {
  return (
    <Col span={span || 12}>
      <BaseForm.Item
        rules={[
          {
            required: isRequired ?? true,
            message: `Please enter, ${props.label}`,
          },
          ...(rule ? rule : []),
        ]}
        {...props}
      >
        {children ? (
          children
        ) : textarea ? (
          <Input.TextArea rows={2} placeholder={`Please enter, ${props.label}`} />
        ) : isInputNumber ? (
          <InputNumber $block placeholder={`Please enter, ${props.label}`} />
        ) : isSwitch ? (
          <Switch defaultChecked={props.checked as unknown as boolean} />
        ) : options ? (
          <Select options={options} placeholder={`Please select, ${props.label}`} />
        ) : (
          <Input {...props} placeholder={`Please enter, ${props.label}`} />
        )}
      </BaseForm.Item>
    </Col>
  );
};
