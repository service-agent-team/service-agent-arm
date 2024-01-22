import { modal } from '@/app';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import { AgentRolesRow, DataIndex, IhandleSearchProps } from './types';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);

  const navigate = useNavigate();

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: `${record.isDeleted ? 'Enable' : 'Disable'}`,
      title: `You want to delete right ?`,
      onOk: () => {
        // deletCarType({
        //   id: record.carTypeId,
        //   callback: () => {
        //     getCarType({ callback: () => {} });
        //     addNotification('Deleted.');
        //     return 'ok';
        //   },
        // });
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<AgentRolesRow> => ({
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

  const columns: ColumnsType<AgentRolesRow> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'userTariffId',
      width: '4%',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
      ...getColumnSearchProps('description'),
    },

    {
      title: 'CreatedDateTime',
      dataIndex: 'createdDateTime',
      key: 'createdDateTime',
      width: '20%',
      ...getColumnSearchProps('createdDateTime'),
    },

    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
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
            <Button key={2} onClick={() => handleDelete(record)}>
              <DeleteOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];

  return columns;
};
