import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, InputRef, MenuProps, Row, Space, Tag, message } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { items } from './constants';
import { DataIndex, IHandleSearchProps, AgentTableRowV2 } from './types';
import { LinkButton } from '@/components/common/buttons';
import { Icon } from '@/components';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);

  const handleMenuClick: MenuProps['onClick'] = () => {
    message.success('Click on menu item.');
  };

  const menuProps = {
    items: items,
    onClick: handleMenuClick,
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<AgentTableRowV2> => ({
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

  const columns: ColumnsType<AgentTableRowV2> = [
    {
      title: 'Id',
      dataIndex: 'userId',
      key: 'userId',
      width: '4%',
      sorter: (a, b) => a.userId - b.userId,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('firstName'),
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '20%',
      ...getColumnSearchProps('lastName'),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: '20%',
    },
    {
      title: 'Phone number',
      dataIndex: 'login',
      key: 'login',
      width: '20%',
    },
    {
      title: 'Role',
      dataIndex: 'userRolePermissions',
      key: 'userRolePermissions',
      width: '20%',
      render: (userRolePermissions) => (
        <Row style={{ gap: '4px' }}>
          {userRolePermissions.map((el: any) => {
            return (
              <Tag color={'success'} key={el.role.roleId}>
                {el.role.name?.toUpperCase()}
              </Tag>
            );
          })}
        </Row>
      ),
    },
    {
      title: 'Role Permissions',
      dataIndex: 'userRolePermissions',
      key: 'userRolePermissions',
      width: '20%',
      render: (userRolePermissions) => (
        <Row style={{ gap: '4px' }}>
          {userRolePermissions.map((el: any) =>
            el.permissions?.map((item: any) => (
              <Tag color={'success'} key={item.permissionId}>
                {item.name?.toUpperCase()}
              </Tag>
            )),
          )}
        </Row>
      ),
    },
    {
      title: 'Project',
      dataIndex: 'userProjectPermissions',
      key: 'userProjectPermissions',
      width: '20%',
      render: (userProjectPermissions) => (
        <Row style={{ gap: '4px' }}>
          {userProjectPermissions.map((el: any) => {
            return (
              <Tag color={'success'} key={el.project.projectId}>
                {el.project.name?.toUpperCase()}
              </Tag>
            );
          })}
        </Row>
      ),
    },
    {
      title: 'Project Permission',
      dataIndex: 'userProjectPermissions',
      key: 'userProjectPermissions',
      width: '20%',
      render: (userProjectPermissions) => (
        <Row style={{ gap: '4px' }}>
          {userProjectPermissions.map((el: any) =>
            el.permissions.map((item: any) => (
              <Tag color={'success'} key={item?.permissionId}>
                {item?.name?.toUpperCase()}
              </Tag>
            )),
          )}
        </Row>
      ),
    },
    {
      title: 'User Tariff',
      dataIndex: 'userTariffPermissions',
      key: 'userTariffPermissions',
      width: '20%',
      render: (userTariffPermissions) => (
        <Row style={{ gap: '4px' }}>
          {userTariffPermissions.map((el: any) => {
            return (
              <Tag color={'success'} key={el.tariff.tariffId}>
                {el.tariff.name?.toUpperCase()}
              </Tag>
            );
          })}
        </Row>
      ),
    },
    {
      title: 'User Tariff Permissions',
      dataIndex: 'userTariffPermissions',
      key: 'userTariffPermissions',
      width: '20%',
      render: (userTariffPermissions) => (
        <Row style={{ gap: '4px' }}>
          {userTariffPermissions.map((el: any) =>
            el.permissions?.map((item: any) => (
              <Tag color={'success'} key={item.permissionId}>
                {item.name?.toUpperCase()}
              </Tag>
            )),
          )}
        </Row>
      ),
    },
    {
      title: 'View',
      dataIndex: 'userId',
      key: 'view',
      render: (userId: number, record: any) => {
        return (
          <LinkButton path={`/service-agent/view/${userId}?video=${record.videoContentId}`}>
            <Icon name="EyeOutlined" />
          </LinkButton>
        );
      },
    },
  ];

  return columns;
};
