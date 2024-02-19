import { ButtonProps } from 'antd';
import { IconBtn } from './style';
import * as AntdIcons from '@ant-design/icons';

type Props = {
  btn?: boolean;
  name: string;
  color?: string;
  fontSize?: string;
} & Partial<ButtonProps>;

export const Icon = ({ btn, name, color, fontSize, ...props }: Props) => {
  /* @ts-ignore */
  const AntdIcon = AntdIcons[name];

  return btn ? (
    <IconBtn {...props}>
      <AntdIcon style={{ fontSize: 25 }} />
    </IconBtn>
  ) : (
    <AntdIcon
      style={{
        fontSize: Number(fontSize),
        color: color,
      }}
      {...props}
    />
  );
};
