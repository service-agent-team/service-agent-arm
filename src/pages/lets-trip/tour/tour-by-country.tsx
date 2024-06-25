import { useActions, useTypedSelector } from '@/common/hooks';
import {
  Icon,
  LetsTripGroupTourTable,
  LetsTripIndividualTourTable,
  SearchInput,
} from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';
import { Button, Col, Row } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './styled';

export const LetsTripByCountryTour = () => {
  const { getByCountryIdLetsTripGroupTour, getByCountryLetsTripIndividualTour } = useActions();
  const {
    pagination: { current, pageSize },
  } = useTypedSelector((state) => state.app);
  const { tourType, countryId } = useParams();
  const navigate = useNavigate();

  const items = [
    {
      key: 'group',
      label: `Group tours`,
      children: <LetsTripGroupTourTable />,
    },
    {
      key: 'individual',
      label: `Individual tours`,
      children: <LetsTripIndividualTourTable />,
    },
  ];

  const handleClickNavigate = () => {
    navigate(`${ROUTES.letsTripTour}/by-country/${countryId}/${tourType}/create`);
  };

  const handleChange = (e: string) => {
    navigate(`${ROUTES.letsTripTour}/by-country/${countryId}/${e}`);
  };

  const restData = () => {
    if (tourType === 'group') {
      return getByCountryIdLetsTripGroupTour({
        page: current - 1,
        size: pageSize,
        countryId: Number(countryId),
      });
    }
    if (tourType === 'individual') {
      return getByCountryLetsTripIndividualTour({
        page: current - 1,
        size: pageSize,
        countryId: Number(countryId),
      });
    }
  };

  useEffect(() => {
    restData();
  }, [countryId, tourType]);

  return (
    <SimplePage>
      <S.CustomTabs
        size="large"
        type="card"
        items={items}
        onChange={(e) => handleChange(e)}
        activeKey={tourType}
        tabBarExtraContent={
          <Row gutter={24}>
            <Col>
              <SearchInput placeholder="Search a group tour" />
            </Col>
            <Col>
              <Button onClick={restData} type="primary" shape="circle">
                <Icon name="SyncOutlined" />
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={() => handleClickNavigate()}>
                <Icon name="PlusOutlined" />
                Create
              </Button>
            </Col>
          </Row>
        }
      />
    </SimplePage>
  );
};
