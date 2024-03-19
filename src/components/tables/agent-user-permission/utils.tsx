import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IHandleSearchProps } from './types';
import { IAgentUserPermission } from '@/store/service-agent/user-permission/types';
import { modal } from '@/components/app';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: `${record.isDeleted ? 'Enable' : 'Disable'}`,
      title: `You want to delete right ?`,
      onOk: () => {},
    });
  };

  const handleSearch = ({ selectedKeys, confirm, dataIndex }: IHandleSearchProps) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IAgentUserPermission> => ({
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

  const columns: ColumnsType<IAgentUserPermission> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId',
      width: '20%',
      ...getColumnSearchProps('userId'),
    },
    {
      title: 'Permission Id',
      dataIndex: 'permissionId',
      key: 'permissionId',
      width: '20%',
      ...getColumnSearchProps('permissionId'),
    },
    {
      title: 'Project Id',
      dataIndex: 'projectId',
      key: 'projectId',
      width: '20%',
      ...getColumnSearchProps('projectId'),
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
              onClick={() => navigate(`${ROUTES.agentUserPermission}/edit/${record.id}`)}
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
