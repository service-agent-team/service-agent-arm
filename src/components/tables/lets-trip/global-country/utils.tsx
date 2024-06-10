import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tag } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IHandleSearchProps } from './types';
import { dateParser } from '@/common/utils/format';
import { Icon } from '@/components';
import { useActions } from '@/common/hooks';
import { useNavigate } from 'react-router-dom';
import { ILetsTripGlobalCountry } from '@/store/lets-trip/global-country/types';
import { ROUTES } from '@/constants';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);
  const { setSelectGlobalCountry } = useActions();
  const navigate = useNavigate();

  const handleSearch = ({ selectedKeys, confirm, dataIndex }: IHandleSearchProps) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // const handleDelete = (record: any) => {
  //   modal.confirm({
  //     okText: `${record.isDeleted ? 'Enable' : 'Delete'}`,
  //     title: `You want to delete right ?`,
  //     onOk: () => {
  //       deleteLetsTripCountry({
  //         callback() {
  //           addNotification('successfully deleted');
  //           if (globalCountries)
  //             setGlobalCountry(globalCountries.filter((el) => el.id !== record.id));
  //         },
  //         id: record.id,
  //       });
  //       if (errors) addNotification(errors);
  //     },
  //   });
  // };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ILetsTripGlobalCountry> => ({
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

  const columns: ColumnsType<ILetsTripGlobalCountry> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      sorter: (a, b) => {
        if (a.id && b.id) a.id - b.id;
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      render: (_: any, __: any, idx: number) => idx + 1,
    },
    {
      title: 'Country Name',
      dataIndex: ['name', 'en'],
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: '20%',
      render: (value) => <Tag color="success">{value?.toUpperCase()}</Tag>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '20%',
      render: (value) => <Tag color="success">{value?.toUpperCase()}</Tag>,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '20%',
      render: (date) => {
        return dateParser(date);
      },
    },
    {
      title: 'View',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      render: (id: number, record) => (
        <Button
          onClick={() => {
            navigate(`${ROUTES.letsTripGlobalRegion}/${id}`);
            setSelectGlobalCountry(record);
          }}
        >
          <Icon name="EyeOutlined" />
        </Button>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_: number, record) => {
        return (
          <Space>
            <Button
              key={1}
              type="primary"
              onClick={() => {
                navigate(ROUTES.letsTripGlobalRegionCreate);
                setSelectGlobalCountry(record);
              }}
            >
              <Icon name="SettingOutlined" />
            </Button>
            {/* <Button
              type="primary"
              key={2}
              onClick={() => {
                navigate(`${ROUTES.letsTripGlobalRegion}/${id}`);
              }}
            >
              <Icon name="EditOutlined" />
            </Button> */}
            {/* <Button type="primary" danger key={2} onClick={() => handleDelete(record)}>
              <DeleteOutlined />
            </Button> */}
          </Space>
        );
      },
    },
  ];

  return columns;
};
