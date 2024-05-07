import { modal } from '@/components/app';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Row, Space, Tag } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IhandleSearchProps, PermissionTableRow } from './types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);
  const { getOnePermision, deletePermission, setPermissions } = useActions();
  const { permissions } = useTypedSelector((state) => state.permission);
  const navigate = useNavigate();

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: 'delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deletePermission({
          id: record.permission_id,
          callback: () => {
            setPermissions(permissions?.filter((el) => el.permission_id !== record.permission_id));
            addNotification('successfully permission deleted !');
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<PermissionTableRow> => ({
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

  const columns: ColumnsType<PermissionTableRow> = [
    {
      title: 'Id',
      dataIndex: 'permission_id',
      key: 'permission_id',
      width: '4%',
      sorter: (a, b) => a.permission_id - b.permission_id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'permission_name',
      key: 'permission_name',
      width: '20%',
      ...getColumnSearchProps('permission_name'),
    },
    {
      title: 'Description',
      dataIndex: 'permission_description',
      key: 'permission_description',
      width: '20%',
      ...getColumnSearchProps('permission_description'),
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
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
      width: '20%',
      render: (_, { userPermission }) => (
        <Row style={{ gap: '4px' }}>
          {userPermission?.map((permission) => {
            let color = permission?.user_id?.user_name?.length > 5 ? 'green' : 'geekblue';

            if (permission.user_id?.user_name === 'manage') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={permission?.user_id?.user_name}>
                {permission?.user_id?.user_name?.toUpperCase()}
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
      render: (_: any, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              getOnePermision({
                id: record.permission_id,
                callback: () => {
                  navigate(`${ROUTES.permissions}/edit/${record.permission_id}`);
                },
              });
            }}
          >
            <EditOutlined />
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return columns;
};
