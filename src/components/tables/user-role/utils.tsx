import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tag } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IHandleSearchProps } from './types';
import { IUserRole } from '@/store/global/user-role/types';
import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { modal } from '@/components';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);
  const { deleteUserRole, setUserRoles } = useActions();
  const { userRoles } = useTypedSelector((state) => state.userRole);

  const handleSearch = ({ selectedKeys, confirm, dataIndex }: IHandleSearchProps) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: `${record.isDeleted ? 'Enable' : 'Delete'}`,
      title: `You want to delete right ?`,
      onOk: () => {
        deleteUserRole({
          id: Number(record.user_roles_id),
          callback: () => {
            addNotification('successfully deleted');
          },
        });
        setUserRoles(
          userRoles?.filter((userRole) => userRole.user_roles_id !== record.user_roles_id),
        );
      },
    });
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IUserRole> => ({
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

  const columns: ColumnsType<IUserRole> = [
    {
      title: 'Id',
      dataIndex: 'user_roles_id',
      key: 'user_roles_id',
      width: '4%',
      sorter: (a, b) => a.user_roles_id - b.user_roles_id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Username',
      dataIndex: 'user_id',
      key: 'user_id',
      width: '4%',
      render: (_, { user_id }) => user_id?.user_name,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      render: (_, { user_id }) => user_id?.email,
    },
    {
      title: 'User Role',
      dataIndex: 'user_role_name',
      key: 'user_role_name',
      width: '20%',
      render: (user_role) => <Tag color="success">{user_role.toUpperCase()}</Tag>,
    },
    {
      title: 'User Role Description',
      dataIndex: 'user_role_description',
      key: 'user_role_description',
      width: '20%',
    },
    {
      title: 'Role',
      dataIndex: 'role_id',
      key: 'role_id',
      width: '20%',
      render: (_, { role_id }) => <Tag color="success">{role_id?.role_name.toUpperCase()}</Tag>,
    },
    {
      title: 'Role Description',
      dataIndex: 'role_id',
      key: 'role_id',
      width: '20%',
      render: (_, { role_id }) => role_id?.description,
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_, record: any) => {
        return (
          <Space>
            <Button
              key={1}
              onClick={() => {
                // getOneUser({
                //   id: record.user_id,
                //   callback: () => {
                //     navigate(`/global/users/edit/${record.user_id}`);
                //   },
                // });
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
