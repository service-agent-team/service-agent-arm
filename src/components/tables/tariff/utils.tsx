import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, InputRef, MenuProps, Space, Tag, message } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { items } from './constants';
import { DataIndex, IhandleSearchProps, UserTableRow } from './types';

const handleMenuClick: MenuProps['onClick'] = (_: any) => {
  message.success('Click on menu item.');
};

const menuProps = {
  items: items,
  onClick: handleMenuClick,
};

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = ({ selectedKeys, confirm, dataIndex }: IhandleSearchProps) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<UserTableRow> => ({
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

  const columns: ColumnsType<UserTableRow> = [
    {
      title: 'Id',
      dataIndex: 'tarifId',
      key: 'tarifId',
      width: '4%',
      sorter: (a, b) => a.tarifId - b.tarifId,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'MinimalDuration',
      dataIndex: 'minimalDuration',
      key: 'minimalDuration',
      width: '4%',
      sorter: (a, b) => a.minimalDuration - b.minimalDuration,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'NameUz',
      dataIndex: 'nameUz',
      key: 'nameUz',
      width: '20%',
      ...getColumnSearchProps('nameUz'),
    },
    {
      title: 'NameRu',
      dataIndex: 'nameRu',
      key: 'nameRu',
      width: '20%',
      ...getColumnSearchProps('nameRu'),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '20%',
      ...getColumnSearchProps('price'),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '20%',
      ...getColumnSearchProps('createdAt'),
    },
    {
      title: 'IsDeleted',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      width: '20%',
      render: (_, { isDeleted }) => {
        let color = isDeleted ? 'geekblue' : 'green';
        return <Tag color={color}>{String(isDeleted)}</Tag>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              Actions
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      ),
    },
  ];

  return columns;
};
