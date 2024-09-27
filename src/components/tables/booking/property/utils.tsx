import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IHandleSearchProps } from './types';
import { dateParser } from '@/common/utils/format';
import { Actions } from './actions';
import { IProperty } from '@/store/booking/property/types';
import { Icon } from '@/components/common/icon';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);
  const [show, setShow] = useState(true);

  const handleSearch = ({ selectedKeys, confirm, dataIndex }: IHandleSearchProps) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IProperty> => ({
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

  const columns: ColumnsType<IProperty> = [
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 800,
      render: (value: string) => (
        <>
          {show ? value?.slice(0, 100) : value} {!show || '... '}
          {
            <Icon
              onClick={() => setShow(!show)}
              size="small"
              type="primary"
              name={show ? 'EyeOutlined' : 'EyeInvisibleOutlined'}
            />
          }
        </>
      ),
    },
    // {
    //   title: 'Contact Number',
    //   dataIndex: 'contactNumber',
    //   key: 'contactNumber',
    // },
    // {
    //   title: 'Star Rating',
    //   dataIndex: 'starRating',
    //   key: 'starRating',
    //   render: (value) => <Tag color="blue">{value}</Tag>,
    // },
    // {
    //   title: 'Property Type',
    //   dataIndex: 'propertyType',
    //   key: 'propertyType',
    //   render: (value) => <Tag color="blue">{value}</Tag>,
    // },
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
