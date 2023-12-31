import { Button } from 'antd';
import { MouseEventHandler, ReactNode } from 'react';

interface Iprops {
  children: ReactNode;
  click?: MouseEventHandler;
  color: any;
  width?: string;
  to?: string;
}

export const SimpleButton = ({ children, click, color, width, to, ...props }: Iprops) => {
  return (
    <Button
      onClick={click}
      type="primary"
      style={{
        background: `var(${color})`,
        borderColor: 'black/80',
        width: `${width ? width : '100%'}`,
        height: '45px',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
