import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tag } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IHandleSearchProps } from './types';
import { LinkButton } from '@/components/common/buttons';
import { dateParser } from '@/common/utils/format';
import { ILetsTripTransfer } from '@/store/lets-trip/transfer/types';

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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ILetsTripTransfer> => ({
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

  const columns: ColumnsType<ILetsTripTransfer> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'TransferName',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
      width: '20%',
      render: (value) => value?.name,
    },
    {
      title: 'company',
      dataIndex: 'company',
      key: 'company',
      width: '20%',
      render: (value) => value?.name,
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
    },
    {
      title: 'startingPrice',
      dataIndex: 'startingPrice',
      key: 'startingPrice',
      width: '20%',
      render: (value, parent) =>
        value && (parent.currency === 'USD' ? `${value} $` : `${value} uzs`),
    },
    {
      title: 'sellingPrice',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
      width: '20%',
      render: (value, parent) =>
        value && (parent.currency === 'USD' ? `${value} $` : `${value} uzs`),
    },
    {
      title: 'currency',
      dataIndex: 'currency',
      key: 'currency',
      width: '20%',
    },
    {
      title: 'countryCode',
      dataIndex: 'countryCode',
      key: 'countryCode',
      width: '20%',
      render: (value) => <Tag color="success">{value}</Tag>,
    },
    {
      title: 'hourly',
      dataIndex: 'hourly',
      key: 'hourly',
      width: '20%',
    },
    {
      title: 'View',
      dataIndex: 'id',
      key: 'view',
      width: '10%',
      render: (_: number) => {
        return (
          <LinkButton path={`#`}>
            <EyeOutlined />
          </LinkButton>
        );
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '30%',
      render: (date) => {
        return dateParser(date);
      },
    },
  ];

  return columns;
};
