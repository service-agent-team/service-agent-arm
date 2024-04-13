import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tag } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IHandleSearchProps } from './types';
import { IUserPermission } from '@/store/global/user-permission/types';
import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { modal } from '@/components';
import { useNavigate } from 'react-router-dom';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);
  const { deleteUserPermission, setUserPermission, getOneUserPermission } = useActions();
  const { userPermissions, errors } = useTypedSelector((state) => state.userPermission);
  const navigate = useNavigate();

  const handleSearch = ({ selectedKeys, confirm, dataIndex }: IHandleSearchProps) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  useEffect(() => {
    if (errors) addNotification(errors);
  }, [errors]);

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: `${record.isDeleted ? 'Enable' : 'Delete'}`,
      title: `You want to delete right ?`,
      onOk: () => {
        deleteUserPermission({
          id: Number(record.user_permission_id),
          callback: () => {
            addNotification('successfully deleted');
            setUserPermission(
              userPermissions?.filter(
                (userPermission) => userPermission.user_permission_id !== record.user_permission_id,
              ),
            );
          },
        });
      },
    });
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IUserPermission> => ({
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

  const columns: ColumnsType<IUserPermission> = [
    {
      title: 'Id',
      dataIndex: 'user_permission_id',
      key: 'user_permission_id',
      width: '4%',
      sorter: (a, b) => a.user_permission_id - b.user_permission_id,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('user_permission_id'),
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
      title: 'Permsission',
      dataIndex: 'permission_id',
      key: 'permission_id',
      width: '20%',
      render: (_, { permission_id }) => (
        <Tag color="success">{permission_id?.permission_name.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Permission Description',
      dataIndex: 'permission_id',
      key: 'permission_id',
      width: '20%',
      render: (_, { permission_id }) => permission_id?.permission_description,
    },
    {
      title: 'Project',
      dataIndex: 'project_id',
      key: 'project_id',
      width: '20%',
      render: (_, { project_id }) => (
        <Tag color="success">{project_id?.project_name?.toUpperCase()}</Tag>
      ),
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
                getOneUserPermission({
                  id: Number(record.user_permission_id),
                  callback: () => {
                    navigate(`/global/user-permissions/edit/${record.user_permission_id}`);
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
