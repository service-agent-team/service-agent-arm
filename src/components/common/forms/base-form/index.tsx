import { Form } from 'antd';
import { ComponentProps } from 'react';

import { FormLayout } from 'antd/es/form/Form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { BaseFormItem, BaseFormList, BaseFormTitle } from '../components';
import { BaseFormInterface } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseFormProps = Omit<ComponentProps<typeof Form>, 'onFinish'> & {
  onFinish?: (values: any) => void;
  onFinishFailed?: () => void;
  layout?: FormLayout;
};

export const BaseForm: BaseFormInterface<BaseFormProps> = ({
  onFinishFailed,
  layout = 'vertical',
  ...props
}: {
  onFinishFailed?: (error: ValidateErrorEntity<unknown>) => void;
  layout?: FormLayout;
}) => {
  const onFinishFailedDefault = (error: ValidateErrorEntity<unknown>) => {
    console.log(error);
  };

  return (
    <Form onFinishFailed={onFinishFailed || onFinishFailedDefault} layout={layout} {...props} />
  );
};

BaseForm.Title = BaseFormTitle;
BaseForm.Item = BaseFormItem;
BaseForm.List = BaseFormList;
BaseForm.useForm = Form.useForm;
BaseForm.Provider = Form.Provider;
