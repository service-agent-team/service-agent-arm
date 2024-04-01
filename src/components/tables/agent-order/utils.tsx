import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Row, Space, Tag } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IHandleSearchProps } from './types';
import { Icon } from '@/components';
import { IAgentOrderData } from '@/store/service-agent/order/types';
import { dateParser } from '@/common/utils/format';
import { useNavigate } from 'react-router-dom';
import { useActions } from '@/common/hooks';

export const utils = () => {
  const { getOneAgent } = useActions();
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IAgentOrderData> => ({
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

  const columns: ColumnsType<IAgentOrderData> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Tariff Plane Name',
      dataIndex: 'order',
      key: 'order',
      width: '20%',
      render: (order) => order.TariffPlanName,
    },
    {
      title: 'Phone Number',
      dataIndex: 'order',
      key: 'order',
      width: '20%',
      render: (order) => order.PhoneNumber,
    },
    {
      title: 'Is Resident',
      dataIndex: 'isResident',
      key: 'isResident',
      width: '15%',
      render: (isResident) =>
        isResident ? <Tag color="success">Resident</Tag> : <Tag color="error">Not Resident</Tag>,
    },
    {
      title: 'Is Esim',
      dataIndex: 'order',
      key: 'order',
      width: '15%',
      render: (order) =>
        order.IsESIM ? <Tag color="success">E-SIM</Tag> : <Tag color="error">PHYSIC</Tag>,
    },
    {
      title: 'View',
      dataIndex: 'id',
      key: 'view',
      width: '3%',
      render: (id: number, order: IAgentOrderData) => {
        return (
          <Button
            onClick={() => {
              getOneAgent({ callback: () => {}, userId: order.userId });
              navigate(`/service-agent/orders/view/${id}`);
            }}
          >
            <Icon name="EyeOutlined" />
          </Button>
        );
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '20%',
      ...getColumnSearchProps('createdAt'),
      render: (date) => dateParser(date),
    },
  ];

  return columns;
};
