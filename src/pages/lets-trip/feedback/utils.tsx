import { dateParser } from '@/common/utils/format';
import { FeedbackStateType, IFeedback } from '@/store/lets-trip/feedback/types';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Rate, Space, Tag } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import { Actions } from './actions';
import { DataIndex, IHandleSearchProps } from './types';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = ({ selectedKeys, confirm, dataIndex }: IHandleSearchProps) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IFeedback> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch({ selectedKeys, confirm, dataIndex })}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch({ selectedKeys, confirm, dataIndex })}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      return (record as any)[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText as string]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<IFeedback> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => {
        if (a.id && b.id) a.id - b.id;
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      render: (_: any, __: any, idx: number) => idx + 1,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      ...getColumnSearchProps('fullName'),
    },
    {
      title: 'Feedback',
      dataIndex: 'title',
      key: 'title',
      width: '600px',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (value) => <Tag color="blue">{value}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'state',
      key: 'state',
      render: (value) => (
        <Tag
          color={
            FeedbackStateType.ACTIVE ? 'green' : FeedbackStateType.NEW ? 'blue-inverse' : 'red'
          }
        >
          {value}
        </Tag>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'star',
      key: 'star',
      render: (v) => <Rate disabled value={v} />,
    },
    {
      title: 'Product',
      key: 'product',
      render: (el: IFeedback) => {
        if (el.type === 'TOUR') {
          return <Link to={`/lets-trip/group-tour/view/${el.productId}`}>{el?.product?.name}</Link>;
        } else if (el.type === 'TRANSFER') {
          return (
            <Link to={`/lets-trip/transfer/edit/${el.productId}`}>{el?.product?.name?.en}</Link>
          );
        }
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => {
        return dateParser(date);
      },
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: number, record) => <Actions record={record} />,
      fixed: 'right',
    },
  ];

  return columns;
};
