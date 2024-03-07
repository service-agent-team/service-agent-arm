import { useActions } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { modal } from '@/components/app';
import { CheckOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tag } from 'antd';
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
  const { disableTariff, enableTariff, getTariff } = useActions();

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: `${record.isDeleted ? 'Enable' : 'Disable'}`,
      title: `You want to delete right ?`,
      onOk: () => {
        if (!record.isDeleted) {
          disableTariff({
            id: record.tarifId,
            callback: () => {
              addNotification('Successfully disabled');
              getTariff({ callback: () => {} });
            },
          });
        } else {
          enableTariff({
            id: record.tarifId,
            callback: () => {
              addNotification('Successfully enabled');
              getTariff({ callback: () => {} });
            },
          });
        }
      },
    });
  };

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
      title: 'TariffId',
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
        let color = !isDeleted ? 'green' : 'red';
        return <Tag color={color}>{!isDeleted ? 'faol' : 'faol emas'}</Tag>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <Space>
            <Button
              key={1}
              onClick={() => {
                navigate(`/transfer/tariff/edit/${record.tarifId}`);
              }}
            >
              <EditOutlined />
            </Button>
            <Button key={2} onClick={() => handleDelete(record)}>
              {record.isDeleted ? <CheckOutlined /> : <DeleteOutlined />}
            </Button>
          </Space>
        );
      },
    },
  ];

  return columns;
};
