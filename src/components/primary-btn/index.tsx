import { Button } from 'antd';
import { ButtonProps } from 'antd/lib';
import classnames from 'classnames';
import classnameBind from 'classnames/bind';
import styles from './primary-btn.module.scss';

const cn = classnameBind.bind(styles);

export const PrimaryBtn = ({ htmlType, children, className, ...props }: ButtonProps) => (
  <Button
    type="primary"
    htmlType={htmlType}
    className={classnames(cn('primary-btn'), className)}
    {...props}
  >
    {children}
  </Button>
);
