import type { TBreakfast, TBreakfastTranslation } from '@/types/booking';
import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Actions } from './actions';

export const BeackfastColumn: ColumnsType<TBreakfast> = [
  {
    title: 'No',
    render(_value, _record, index) {
      return index + 1;
    },
    key: 'id',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a?.id - b?.id,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: '2',
  },
  {
    title: 'Languages',
    dataIndex: 'translations',
    render: (lang: TBreakfastTranslation[]) =>
      lang.map((el, i) => (
        <Tag color="success" key={i}>
          {el.languageType}
        </Tag>
      )),
    key: '3',
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    render: (id: number) => <Actions id={id} />,
    key: '4',
  },
];
