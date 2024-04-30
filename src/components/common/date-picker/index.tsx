import React from 'react';
import { DatePicker, theme } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CellRenderInfo } from 'rc-picker/es/interface';

export const CustomDatePicker: React.FC = () => {
  const { token } = theme.useToken();
  const style: React.CSSProperties = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: '50%',
  };
  const cellRender = React.useCallback((current: number | Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type !== 'date') {
      return info.originNode;
    }
    if (typeof current === 'number') {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div className="ant-picker-cell-inner" style={current.date() === 1 ? style : {}}>
        {current.date()}
      </div>
    );
  }, []);
  return <DatePicker cellRender={cellRender} style={{ width: '100%' }} />;
};
