import { addNotification } from '@/common/utils/addNotification';
import { modal } from '@/components/app';
import { useActions } from '@/hooks';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Row, Space, Tag } from 'antd';
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
  const { deleteUsers, getUsers, getOneUser } = useActions();

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: `${record.isDeleted ? 'Enable' : 'Disable'}`,
      title: `You want to delete right ?`,
      onOk: () => {
        deleteUsers({
          id: record.user_id,
          callback: () => {
            getUsers({ callback: () => {} });
            addNotification('Deleted.');
            return 'ok';
          },
        });
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
      title: 'Id',
      dataIndex: 'user_id',
      key: 'user_id',
      width: '4%',
      sorter: (a, b) => a.user_id - b.user_id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'user_name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('user_name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '20%',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      width: '20%',
      render: (_, { userRoles }) => (
        <Row>
          {userRoles?.map((tag) => {
            let color = tag.user_role_name.length > 5 ? 'geekblue' : 'green';

            if (tag.user_role_name === 'superadmin') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag.user_roles_id}>
                {tag.role_id?.role_name?.toUpperCase()}
              </Tag>
            );
          })}
        </Row>
      ),
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      width: '20%',
      render: (_, { userPermission }) => (
        <Row style={{ gap: '4px' }}>
          {userPermission?.map((permission) => {
            let color =
              permission?.permission_id?.permission_name?.length > 5 ? 'geekblue' : 'green';

            if (permission.permission_id?.permission_name === 'manage') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={permission?.permission_id?.permission_id}>
                {permission?.permission_id?.permission_name?.toUpperCase()}
              </Tag>
            );
          })}
        </Row>
      ),
    },
    {
      title: 'Projects',
      dataIndex: 'projects',
      key: 'projects',
      width: '20%',
      render: (_, { userPermission }) => (
        <Row style={{ gap: '4px' }}>
          {userPermission?.map((permission) => {
            let color = permission?.project_id?.project_name?.length > 5 ? 'green' : 'geekblue';

            if (permission.project_id?.project_name === 'manage') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={permission?.project_id?.project_id}>
                {permission?.project_id?.project_name?.toUpperCase()}
              </Tag>
            );
          })}
        </Row>
      ),
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
                getOneUser({
                  id: record.user_id,
                  callback: () => {
                    navigate(`/global/users/edit/${record.user_id}`);
                  },
                });
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
