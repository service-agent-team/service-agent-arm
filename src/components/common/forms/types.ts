import { Form } from 'antd';
import React from 'react';
import { BaseFormItem, BaseFormList, BaseFormTitle } from './components';

export interface BaseFormInterface<T> extends React.FC<T> {
  Title: typeof BaseFormTitle;
  Item: typeof BaseFormItem;
  List: typeof BaseFormList;
  useForm: typeof Form.useForm;
  Provider: typeof Form.Provider;
}
