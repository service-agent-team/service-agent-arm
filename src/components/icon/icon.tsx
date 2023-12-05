import { ButtonProps } from 'antd';
import { IconBtn } from './style';
import * as AntdIcons from '@ant-design/icons';

type Props = {
  btn?: boolean;
  name: string;
} & Partial<ButtonProps>;

export const Icon = ({ btn, name, ...props }: Props) => {
  /* @ts-ignore */
  const AntdIcon = AntdIcons[name];

  return btn ? (
    <IconBtn {...props}>
      <AntdIcon style={{ fontSize: 20 }} />
    </IconBtn>
  ) : (
    <AntdIcon {...props} />
  );
};
