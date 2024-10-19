import PropTypes from 'prop-types';
import React from 'react';
import { BaseForm, BaseFormProps } from '../base-form';
import { BaseButtonsGroup, BaseFormItem, BaseFormList, BaseFormTitle } from '../components';
import { BaseFormInterface } from '../types';

export interface BaseButtonsFormProps extends BaseFormProps {
  form: any;
  isFieldsChanged: boolean;
  setFieldsChanged?: (state: boolean) => void;
  footer?: React.ReactElement;
  loading?: boolean;
}

export const BaseButtonsForm: BaseFormInterface<BaseButtonsFormProps> = ({
  form,
  isFieldsChanged,
  setFieldsChanged,
  footer,
  loading = false,
  children,
  ...props
}) => {
  const [formDefault] = BaseForm.useForm();
  const currentForm = form || formDefault;

  const onCancel = () => {
    currentForm?.resetFields();
    setFieldsChanged && setFieldsChanged(false);
  };

  return (
    <BaseForm form={currentForm} {...props}>
      {children}
      {isFieldsChanged && (footer || <BaseButtonsGroup loading={loading} onCancel={onCancel} />)}
    </BaseForm>
  );
};

BaseButtonsForm.propTypes = {
  form: PropTypes.object,
  isFieldsChanged: PropTypes.bool.isRequired,
  setFieldsChanged: PropTypes.func,
  footer: PropTypes.element,
  loading: PropTypes.bool,
  children: PropTypes.node,
};

BaseButtonsForm.Title = BaseFormTitle;
BaseButtonsForm.Item = BaseFormItem;
BaseButtonsForm.List = BaseFormList;
BaseButtonsForm.useForm = BaseForm.useForm;
BaseButtonsForm.Provider = BaseForm.Provider;
BaseButtonsForm.ErrorList = BaseForm.ErrorList;
