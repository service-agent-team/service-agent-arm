import { Button } from 'antd';
import classnames from 'classnames';
import classnameBind from 'classnames/bind';
import styles from './primary-btn.module.scss';

const cn = classnameBind.bind(styles);

export const PrimaryBtn = ({ btn, children, className, ...props }: any) => (
  <Button
    type="primary"
    htmlType={btn ? 'button' : 'submit'}
    className={classnames(cn('primary-btn'), className)}
    {...props}
  >
    {children}
  </Button>
);
