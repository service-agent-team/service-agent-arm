import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import { DataIndex, IhandleSearchProps, UserTableRow } from './types';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();

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
      title: 'driverId',
      dataIndex: 'driverId',
      key: 'driverId',
      width: '4%',
      sorter: (a, b) => a.driverId - b.driverId,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'profileId',
      dataIndex: 'profileId',
      key: 'profileId',
      width: '4%',
      sorter: (a, b) => a.driverId - b.driverId,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'carId',
      dataIndex: 'carId',
      key: 'carId',
      width: '4%',
      sorter: (a, b) => a.carId - b.carId,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'carModel',
      dataIndex: 'carModel',
      key: 'carModel',
      width: '20%',
      ...getColumnSearchProps('carModel'),
    },
    {
      title: 'carNumber',
      dataIndex: 'carNumber',
      key: 'carNumber',
      width: '20%',
      ...getColumnSearchProps('carNumber'),
    },
    {
      title: 'firstName',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '20%',
      ...getColumnSearchProps('firstName'),
    },
    {
      title: 'lastName',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '20%',
      ...getColumnSearchProps('lastName'),
    },
    {
      title: 'phoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '20%',
      ...getColumnSearchProps('phoneNumber'),
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      ...getColumnSearchProps('status'),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '5%',
      render: (_: any, record: any) => {
        return (
          <Space>
            <Button
              key={1}
              onClick={() => {
                navigate(`/transfer/car-type/edit/${record.carTypeId}`);
              }}
            >
              <EditOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];

  return columns;
};
