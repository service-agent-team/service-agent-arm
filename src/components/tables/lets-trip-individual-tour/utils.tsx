import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space, Tag } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { DataIndex, IHandleSearchProps } from './types';
import { LinkButton } from '@/components/common/buttons';
import { dateParser } from '@/common/utils/format';
import { modal } from '@/components';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { addNotification } from '@/common';
import { ILetsTripIndividualTour } from '@/store/lets-trip/individual-tour/types';

export const utils = () => {
  const [searchText, setSearchText] = useState<string | Key>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);
  const {
    geOneRawLetsTripIndividualTour,
    deleteLetsTripIndividualTour,
    setLetsTripIndividualTour,
    setLetsTripActiveIndividualTour,
  } = useActions();
  const { errors, individualTours } = useTypedSelector((state) => state.letsTripIndividualTour);
  const navigate = useNavigate();

  const handleSearch = ({ selectedKeys, confirm, dataIndex }: IHandleSearchProps) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleDelete = (record: any) => {
    modal.confirm({
      okText: `${record.isDeleted ? 'Enable' : 'Delete'}`,
      title: `You want to delete right ?`,
      onOk: () => {
        deleteLetsTripIndividualTour({
          callback() {
            addNotification('individual tour successfully deleted');
            if (individualTours) {
              const newTours = individualTours.map((el) => {
                if (el.id === record.id) {
                  return {
                    ...el,
                    deleted: true,
                  };
                }
                return el;
              });

              setLetsTripIndividualTour(newTours);
              setLetsTripActiveIndividualTour(newTours.filter((el) => el.deleted === false));
            }
          },
          id: record.id,
        });
        if (errors) addNotification(errors);
      },
    });
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ILetsTripIndividualTour> => ({
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

  const columns: ColumnsType<ILetsTripIndividualTour> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Tour Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (value) => value.en,
    },
    {
      title: 'Starting Price',
      dataIndex: 'startingPrice',
      key: 'startingPrice',
      width: '20%',
      ...getColumnSearchProps('startingPrice'),
      render: (value) => `${value} $`,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      width: '5%',
      render: (value) => value.name.en?.toUpperCase(),
    },
    {
      title: 'Active',
      dataIndex: 'deleted',
      key: 'deleted',
      width: '5%',
      render: (value) =>
        value ? <Tag color="red">DELETED</Tag> : <Tag color="success">ACTIVE</Tag>,
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
      key: 'view',
      width: '10%',
      render: (_, record: any) => {
        return (
          <LinkButton path={`${ROUTES.letsTripIndividualTour}/view/${record.id}`}>
            <EyeOutlined />
          </LinkButton>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_: any, record: any) => {
        return (
          <Space>
            {record.deleted ? (
              'No Actions'
            ) : (
              <>
                <Button
                  type="primary"
                  key={1}
                  onClick={() =>
                    geOneRawLetsTripIndividualTour({
                      callback() {
                        navigate(`${ROUTES.letsTripIndividualTour}/edit/${record.id}`);
                      },
                      id: record.id,
                    })
                  }
                >
                  <EditOutlined />
                </Button>
                <Button
                  type="primary"
                  danger
                  disabled={record.deleted}
                  key={2}
                  onClick={() => handleDelete(record)}
                >
                  <DeleteOutlined />
                </Button>
              </>
            )}
          </Space>
        );
      },
    },
  ];

  return columns;
};
