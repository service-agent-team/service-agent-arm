import { passwordRegex } from '@/common/utils';
import { Form, Input } from 'antd';
import classnameBind from 'classnames/bind';
import { authDictionary } from '../dictionary';
import styles from './field.module.scss';
import { IFieldsProps } from './fields.props';

const cn = classnameBind.bind(styles);

export const UsernameField = ({ label, value, placeholder }: IFieldsProps) => (
  <Form.Item
    name="email"
    label={label}
    initialValue={value}
    rules={[
      {
        required: true,
        type: 'email',
      },
    ]}
  >
    <Input autoComplete="on" autoFocus placeholder={placeholder} className={cn('sign')} />
  </Form.Item>
);

export const PasswordField = ({ name, label, value, placeholder }: IFieldsProps) => (
  <Form.Item
    name={name}
    label={label}
    initialValue={value}
    rules={[
      {
        required: true,
        pattern: passwordRegex,
        message: authDictionary.passwordMessage,
      },
    ]}
  >
    <Input.Password autoComplete="on" placeholder={placeholder} className={cn('sign')} />
  </Form.Item>
);
