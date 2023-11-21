import classnames from 'classnames';
import classnamesBind from 'classnames/bind';
import styles from './content-center.module.scss';
import { IContentProps } from './content.props';

const cn = classnamesBind.bind(styles);

export const ContentCenter = ({ children, className }: IContentProps) => (
  <div className={classnames(cn('content-center'), className)}>{children}</div>
);
