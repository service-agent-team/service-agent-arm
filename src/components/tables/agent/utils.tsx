import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, InputRef, MenuProps, Space, message } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { items } from './constants';
import { DataIndex, IhandleSearchProps, AgentTableRow } from './types';
import { useNavigate } from 'react-router-dom';
import { LinkButton } from '@/components/common/buttons';

export const utils = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const [user, setUser] = useState<number | undefined>();
  const searchInput = useRef<InputRef>(null);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.success('Click on menu item.');
    console.log(user);
  };

  const handleNavigate = (id: number) => {
    console.log(id);
    return navigate(`/view/${id}`);
  };

  const menuProps = {
    items: items,
    onClick: handleMenuClick,
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<AgentTableRow> => ({
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

  const columns: ColumnsType<AgentTableRow> = [
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
      title: 'View',
      dataIndex: 'userId',
      key: 'view',
      render: (userId: number) => {
        return <LinkButton path={`/service-agent/view/${userId}`}>view</LinkButton>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'userId',
      key: 'action',
      render: (data) => {
        setUser(data);
        return (
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Actions
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return columns;
};
