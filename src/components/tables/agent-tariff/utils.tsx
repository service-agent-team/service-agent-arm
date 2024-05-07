import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, MenuProps, Space, message } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IHandleSearchProps } from './types';
import { modal } from '@/components/app';
import { IAgentTariffV2 } from '@/store/service-agent/tariff/types';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);
  const { deleteAgentTariffCategory, getOneAgentTariffCategory, setAgentTariffCategory } =
    useActions();
  const { tariffs } = useTypedSelector((state) => state.agentTariff);
  const navigate = useNavigate();

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: `${record.isDeleted ? 'Enable' : 'Disable'}`,
      title: `You want to delete right ?`,
      onOk: () => {
        deleteAgentTariffCategory({
          id: record.tariffId,
          callback() {
            addNotification('successfully deleted agent tariff');
            const data = tariffs?.filter((el) => el.tariffId !== record.tariffId);
            if (data) setAgentTariffCategory(data);
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IAgentTariffV2> => ({
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

  const columns: ColumnsType<IAgentTariffV2> = [
    {
      title: 'Id',
      dataIndex: 'tariffId',
      key: 'tariffId',
      width: '4%',
      sorter: (a, b) => a.tariffId - b.tariffId,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'category',
      dataIndex: 'categoryId',
      key: 'gold',
      ...getColumnSearchProps('categoryId'),
    },
    {
      title: 'Actions',
      dataIndex: 'userId',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <Space>
            <Button
              type="primary"
              key={1}
              onClick={() => {
                return getOneAgentTariffCategory({
                  id: record.tariffId,
                  callback: () => navigate(`${ROUTES.agentTariff}/edit/${record.tariffId}`),
                });
              }}
            >
              <EditOutlined />
            </Button>
            <Button type="primary" danger key={2} onClick={() => handleDelete(record)}>
              <DeleteOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];

  return columns;
};
