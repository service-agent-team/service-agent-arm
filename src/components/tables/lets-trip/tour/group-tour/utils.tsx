import { Col, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { LinkButton } from '@/components/common/buttons';
import { dateParser } from '@/common/utils/format';
import { useTypedSelector } from '@/common/hooks';
import { ROUTES } from '@/constants';
import { Icon } from '@/components';
import { ILetsTripGroupTour } from '@/store/lets-trip/group-tour/types';
import { Actions } from './actions';
import { OldPrice } from '@/components/forms/letstrip/group-tour/edit/styled';

export const utils = () => {
  const { globalCountries } = useTypedSelector((state) => state.letsTripGlobalCountry);

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
      render: (value) => <div dangerouslySetInnerHTML={{ __html: value }} />,
    },
    {
      title: 'Country',
      dataIndex: 'countryId',
      key: 'countryId',
      width: '25%',
      render: (id: number) => globalCountries?.find((c) => c.id === id)?.name?.en,
    },
    {
      title: 'Excursion Price',
      dataIndex: 'price',
      key: 'price',
      width: '25%',
      render: (value, { upTo2, upTo4, upTo6, upTo10 }) => {
        if (value) {
          return <>${value / 100}</>;
        }

        return (
          <Row>
            <Col span={24}>2 per person - ${upTo2 / 100}</Col>
            <Col span={24}>4 per person - {upTo4 / 100}</Col>
            <Col span={24}>6 per person - ${upTo6 / 100}</Col>
            <Col span={24}>10 per person - ${upTo10 / 100}</Col>
          </Row>
        );
      },
    },

    {
      title: 'Excursion Old Price',
      dataIndex: 'price',
      key: 'price',
      width: '25%',
      render: (value, { oldPrice, oldUpTo2, oldUpTo4, oldUpTo6, oldUpTo10 }) => {
        if (value) {
          return <>{<OldPrice>${oldPrice / 100}</OldPrice>}</>;
        }

        return (
          <Row>
            <Col span={24}>2 per person - ${oldUpTo2 / 100}</Col>
            <Col span={24}>4 per person - ${oldUpTo4 / 100}</Col>
            <Col span={24}>6 per person -${oldUpTo6 / 100}</Col>
            <Col span={24}>10 per person - ${oldUpTo10 / 100}</Col>
          </Row>
        );
      },
    },
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
      render: (_, record: ILetsTripGroupTour) => <Actions record={record} />,
    },
  ];

  return columns;
};
