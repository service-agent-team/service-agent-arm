import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, InputRef, MenuProps, Space, message } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
// import { items } from './constants';
import { DataIndex, IhandleSearchProps, AgentTariffRow } from './types';
import { LinkButton } from '@/components/common/buttons';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);

  const handleMenuClick: MenuProps['onClick'] = () => {
    message.success('Click on menu item.');
  };

  const menuProps = {
    // items: items,
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<AgentTariffRow> => ({
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

  const columns: ColumnsType<AgentTariffRow> = [
    {
      title: 'Id',
      dataIndex: 'userTariffId',
      key: 'userTariffId',
      width: '4%',
      sorter: (a, b) => a.userTariffId - b.userTariffId,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'tariffName',
      key: 'tariffName',
      width: '20%',
      ...getColumnSearchProps('tariffName'),
    },
    {
      title: 'category',
      dataIndex: 'categoryId',
      key: 'gold',
      width: '20%',
      ...getColumnSearchProps('categoryId'),
    },

    {
      title: 'View',
      dataIndex: 'id',
      key: 'view',
      render: (id: number) => {
        return <LinkButton path={`/service-agent/view/${id}`}>view</LinkButton>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'userId',
      key: 'action',
      render: () => {
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
