import { modal } from '@/components/app';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Row, Space, Tag } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IHandleSearchProps } from './types';
import { IRole } from '@/store/global/role/types';
import { dateParser } from '@/common/utils/format';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { useNavigate } from 'react-router-dom';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);
  const { deleteRole, setRole, getOneRole } = useActions();
  const { roles } = useTypedSelector((state) => state.role);
  const navigate = useNavigate();

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: 'delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteRole({
          id: Number(record.role_id),
          callback() {
            addNotification('successfully delete role !');
            setRole(roles?.filter((role) => role.role_id !== record.role_id));
          },
        });
      },
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IRole> => ({
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

  const columns: ColumnsType<IRole> = [
    {
      title: 'Id',
      dataIndex: 'role_id',
      key: 'role_id',
      width: '4%',
      sorter: (a, b) => a.role_id - b.role_id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'role_name',
      key: 'role_name',
      width: '20%',
      ...getColumnSearchProps('role_name'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
      render: (description) => (
        <Row style={{ gap: '4px' }}>
          {description.split(',').map((el: any, idx: number) => (
            <Tag key={el + idx} color="success">
              {el.toUpperCase()}
            </Tag>
          ))}
        </Row>
      ),
    },
    {
      title: 'User Roles',
      dataIndex: 'userRoles',
      key: 'userRoles',
      width: '20%',
      render: (_, { userRoles }) => (
        <Row style={{ gap: '4px' }}>
          {userRoles?.map((role) => {
            return (
              <Tag color={'success'} key={role.user_roles_id}>
                {role.user_role_name.toUpperCase()}
              </Tag>
            );
          })}
        </Row>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '20%',
      render: (date) => dateParser(date),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record) => (
        <Space>
          <Button
            onClick={() => {
              getOneRole({
                id: record.role_id,
                callback: () => {
                  navigate(`/global/roles/edit/${record.role_id}`);
                },
              });
            }}
          >
            <EditOutlined />
          </Button>
          <Button onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return columns;
};
