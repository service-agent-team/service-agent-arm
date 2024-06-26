import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IHandleSearchProps } from './types';
import { LinkButton } from '@/components/common/buttons';
import { dateParser } from '@/common/utils/format';
import { useNavigate, useParams } from 'react-router-dom';
import { useActions, useTypedSelector } from '@/common/hooks';
import { ROUTES } from '@/constants';
import { Icon, modal } from '@/components';
import { addNotification } from '@/common';
import { ILetsTripGroupTour } from '@/store/lets-trip/group-tour/types';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);
  const { deleteLetsTripGroupTour, setLetsTripGroupTourByCountryId, getOneRawLetsTripTour } =
    useActions();
  const { byCountryIdTours } = useTypedSelector((state) => state.letsTripTour);
  const navigate = useNavigate();
  const { countryId, tourType } = useParams();
  const { globalCountries } = useTypedSelector((state) => state.letsTripGlobalCountry);

  const handleSearch = ({ selectedKeys, confirm, dataIndex }: IHandleSearchProps) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handleDelete = (record: ILetsTripGroupTour) => {
    modal.confirm({
      okText: 'Delete',
      title: `You want to delete right ?`,
      onOk: () => {
        deleteLetsTripGroupTour({
          callback() {
            addNotification('successfully deleted');
            if (byCountryIdTours)
              setLetsTripGroupTourByCountryId(
                byCountryIdTours.filter((el) => el.tourId !== record.tourId),
              );
          },
          id: String(record?.tourId),
        });
      },
    });
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ILetsTripGroupTour> => ({
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

  const columns: ColumnsType<ILetsTripGroupTour> = [
    {
      title: 'Id',
      dataIndex: 'tourId',
      key: 'tourId',
      width: '4%',
      sorter: (a, b) => a.tourId - b.tourId,
      sortDirections: ['descend', 'ascend'],
      render: (_: any, __: any, id) => id + 1,
    },
    {
      title: 'Tour Name',
      dataIndex: ['name', 'en'],
      key: 'name',
      width: '25%',
    },
    {
      title: 'Country',
      dataIndex: 'countryId',
      key: 'countryId',
      width: '25%',
      render: (id: number) => globalCountries?.find((c) => c.id === id)?.name?.en,
    },
    {
      title: 'Starting Price',
      dataIndex: 'startingPrice',
      key: 'startingPrice',
      width: '25%',
      ...getColumnSearchProps('startingPrice'),
      render: (value) => `${value / 100} $`,
    },
    // {
    //   title: 'Active',
    //   dataIndex: 'deleted',
    //   key: 'deleted',
    //   width: '5%',
    //   render: (value) =>
    //     value ? <Tag color="red">DELETED</Tag> : <Tag color="success">ACTIVE</Tag>,
    // },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '25%',
      render: (date) => {
        return dateParser(date);
      },
    },
    {
      title: 'View',
      dataIndex: 'tourId',
      key: 'view',
      width: '10%',
      render: (_, record: ILetsTripGroupTour) => {
        return (
          <LinkButton path={`${ROUTES.letsTripGroupTour}/view/${record.tourId}`}>
            <Icon name="EyeOutlined" />
          </LinkButton>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_, record: ILetsTripGroupTour) => {
        return (
          <Space>
            <Button
              type="primary"
              key={1}
              onClick={() =>
                getOneRawLetsTripTour({
                  id: String(record.tourId),
                  callback: () => {
                    navigate(
                      `${ROUTES.letsTripTour}/by-country/${countryId}/${tourType}/edit/${record.tourId}`,
                    );
                  },
                })
              }
            >
              <Icon name="EditOutlined" />
            </Button>
            <Button type="primary" danger key={2} onClick={() => handleDelete(record)}>
              <Icon name="DeleteOutlined" />
            </Button>
          </Space>
        );
      },
    },
  ];

  return columns;
};
