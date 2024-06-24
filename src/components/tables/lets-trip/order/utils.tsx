import { Button, Input, InputRef, Row, Space, Tag } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IHandleSearchProps } from './types';
import { ILetsTripOrder } from '@/store/lets-trip/order/types';
import { dateParser } from '@/common/utils/format';
import { Icon } from '../../../common/icon/icon';
import { useActions, useTypedSelector } from '@/common/hooks';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);
  const { setModal, setLetsTripOrder } = useActions();
  const { isModal } = useTypedSelector((state) => state.app);

  const handleSearch = ({ selectedKeys, confirm, dataIndex }: IHandleSearchProps) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handleViewModal = (record: ILetsTripOrder) => {
    setLetsTripOrder(record);
    setModal(!isModal);
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ILetsTripOrder> => ({
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
            icon={<Icon name="SearchOutlined" />}
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
      <Icon name="SearchOutlined" style={{ color: filtered ? '#1677ff' : undefined }} />
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

  const columns: ColumnsType<ILetsTripOrder> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      render: (_, __, i: number) => i + 1,
    },
    // {
    //   title: 'User Id',
    //   dataIndex: 'userId',
    //   key: 'userId',
    //   width: '8%',
    //   ...getColumnSearchProps('userId'),
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      ...getColumnSearchProps('status'),
    },
    {
      title: 'Project',
      dataIndex: 'type',
      key: 'type',
      width: '20%',
      ...getColumnSearchProps('type'),
    },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
      width: '20%',
      ...getColumnSearchProps('price'),
      render: (price: number) => price / 100 + ' $',
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   width: '20%',
    //   render: (_, { status }) => (
    //     <Row style={{ gap: '4px' }}>
    //       <Tag
    //         key={Math.random() * 100}
    //         color={`${
    //           status === LetsTripOrderStatus.active
    //             ? 'success'
    //             : status === LetsTripOrderStatus.pending
    //               ? 'warning'
    //               : status === LetsTripOrderStatus.rejected
    //                 ? 'red'
    //                 : 'primary'
    //         }`}
    //       >
    //         {status.toUpperCase()}
    //       </Tag>
    //     </Row>
    //   ),
    // },
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
      key: 'view',
      width: '5%',
      render: (_: number, record) => {
        return (
          <Button onClick={() => handleViewModal(record)}>
            <Icon name="EyeOutlined" />
          </Button>
        );
      },
    },
  ];

  return columns;
};
