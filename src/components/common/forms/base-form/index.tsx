import { Form } from 'antd';
import { ComponentProps } from 'react';
import { FormLayout } from 'antd/es/form/Form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { BaseFormErrorList, BaseFormItem, BaseFormList, BaseFormTitle } from '../components';
import { BaseFormInterface } from '../types';

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
  const onFinishFailedDefault = (_: ValidateErrorEntity<unknown>) => {};

  return (
    <Form onFinishFailed={onFinishFailed || onFinishFailedDefault} layout={layout} {...props} />
  );
};

BaseForm.Title = BaseFormTitle;
BaseForm.Item = BaseFormItem;
BaseForm.List = BaseFormList;
BaseForm.ErrorList = BaseFormErrorList;
BaseForm.useForm = Form.useForm;
BaseForm.Provider = Form.Provider;
