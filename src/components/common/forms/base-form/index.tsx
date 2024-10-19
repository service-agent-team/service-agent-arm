import { Form, Row } from 'antd';
import { ComponentProps, ReactNode } from 'react';
import { FormLayout } from 'antd/es/form/Form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { BaseFormErrorList, BaseFormItem, BaseFormList, BaseFormTitle } from '../components';
import { BaseFormInterface } from '../types';
import { PrimaryBtn } from '@/components/primary-btn';
import { IStoreLoadings } from '@/types/app/common';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/loading';

export type BaseFormProps = Omit<ComponentProps<typeof Form>, 'onFinish'> & {
  onFinish?: (values: any) => void;
  onFinishFailed?: () => void;
  layout?: FormLayout;
  children?: ReactNode;
  loading?: IStoreLoadings;
  save: boolean;
};

export const BaseForm: BaseFormInterface<BaseFormProps> = ({
  onFinishFailed,
  layout = 'vertical',
  children,
  loading,
  save = false,
  ...props
}: {
  onFinishFailed?: (error: ValidateErrorEntity<unknown>) => void;
  layout?: FormLayout;
  children?: ReactNode;
  loading?: IStoreLoadings;
  save: boolean;
}) => {
  const onFinishFailedDefault = (_: ValidateErrorEntity<unknown>) => {};
  const { id } = useParams();

  if (loading?.get) {
    return <Loading />;
  }

  return (
    <Form onFinishFailed={onFinishFailed || onFinishFailedDefault} layout={layout} {...props}>
      <Row gutter={[10, 10]}>{children}</Row>
      {save && (
        <PrimaryBtn htmlType="submit" loading={loading?.put || loading?.post || loading?.patch}>
          {id ? 'Edit' : 'Create'}
        </PrimaryBtn>
      )}
    </Form>
  );
};

BaseForm.Title = BaseFormTitle;
BaseForm.Item = BaseFormItem;
BaseForm.List = BaseFormList;
BaseForm.ErrorList = BaseFormErrorList;
BaseForm.useForm = Form.useForm;
BaseForm.Provider = Form.Provider;
