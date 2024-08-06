import { ILetsTripGroupTourGetOne } from '@/store/lets-trip/group-tour/types';
import NoThumbImage from '@/assets/images/no-thumbnail.png';
import { H1, P1 } from '@/components/common';
import { Col, Flex, List, Row, Steps, Typography } from 'antd';
import { PageTitle } from '@/components/page-title';
import * as S from './styled';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { Icon } from '@/components/common/icon';
// import { useState } from 'react';

export const LetsTripGroupTourCard = ({ data }: { data: ILetsTripGroupTourGetOne | null }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyANA8h-fA595Nq-OMLG7JmTBWT-1R5eNVQ',
  });
  const center = (data?.locations[0].lat && {
    lat: data?.locations[0].lat,
    lng: data?.locations[0].lng,
  }) || {
    lat: 43.45,
    lng: -80.49,
  };
  // const [date, setDate] = useState(0);

  return (
    <>
      <PageTitle isHtml title={`${data?.name}`} />
      <Flex style={{ margin: '30px 0' }} justify="space-between" wrap="wrap" gap={30}>
        <S.ImageBlock>
          <S.CustomImageGroup items={data?.images}>
            <S.CustomImage width={'100%'} src={data?.images[0]} fallback={NoThumbImage} />
          </S.CustomImageGroup>
          <S.Title dangerouslySetInnerHTML={{ __html: data?.name as string }} />
          <S.InfoCard width="254px">
            <Row gutter={12}>
              <Col span={24}>
                <Typography.Text strong>Starting Price: </Typography.Text>
                {Number(data?.startingPrice) / 100} $
              </Col>
              <Col span={24}>
                <Typography.Text strong>2 person price: </Typography.Text>
                {Number(data?.upTo2) / 100} $
              </Col>
              <Col span={24}>
                <Typography.Text strong>6 person price: </Typography.Text>
                {Number(data?.upTo6) / 100} $
              </Col>
              <Col span={24}>
                <Typography.Text strong>10 person price: </Typography.Text>
                {Number(data?.upTo10) / 100} $
              </Col>
              <Col span={24}>
                <Typography.Text strong>20 person price: </Typography.Text>
                {Number(data?.upTo20) / 100} $
              </Col>
              <Col span={24}>
                <Row gutter={12}>
                  <Col>
                    <Icon name="ClockCircleOutlined" style={{ marginRight: '8px' }} />
                    {data?.extraInformation?.[0].title}
                  </Col>
                  <Col>
                    <Icon name="DollarOutlined" style={{ marginRight: '8px' }} />
                    {data?.extraInformation?.[0].value}.00
                  </Col>
                </Row>
              </Col>
              {/* <H1>Extra Information: </H1>
            <List>
              {data?.extraInformation.map((el, idx) => (
                <List.Item key={el.title + idx}>
                  {el.title}:
                  <Typography.Paragraph strong key={el.title + idx}>
                    {el.value}
                  </Typography.Paragraph>
                </List.Item>
              ))}
            </List> */}
            </Row>
          </S.InfoCard>
        </S.ImageBlock>
        <div>
          <H1 style={{ fontSize: '32px' }}>Description</H1>
          <div
            style={{ maxWidth: '990px', fontSize: '20px' }}
            dangerouslySetInnerHTML={{ __html: data?.description[0] as string }}
          />
        </div>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            zoom={6}
            center={center}
          >
            {data?.locations.map((location, idx) => <Marker key={idx} position={location} />)}
            <Polyline
              path={data?.locations.map((location) => location)}
              options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 }}
            />
          </GoogleMap>
        ) : (
          ''
        )}
      </Flex>
      <div style={{ marginTop: '30px' }}>
        <S.CustomCard width="100%">
          <H1>{"What's Includes"} </H1>
          {data?.priceIncludes.map((el) => (
            <div key={el}>
              <Typography.Text>✅ {el}</Typography.Text>
            </div>
          ))}
          {data?.priceNotIncludes.map((el) => (
            <div key={el}>
              <Typography.Text>❌ {el}</Typography.Text>
            </div>
          ))}
        </S.CustomCard>
      </div>
      {/* <S.CustomCard width="100%">
        <H1>Select Available Date: </H1>
        <Flex gap={'15px'} style={{ marginTop: '20px' }}>
          {data?.availableDate.map((el, idx) => (
            <Button
              type={date === idx ? 'primary' : 'default'}
              key={el.id}
              onClick={() => setDate(idx)}
            >
              {el.month}
            </Button>
          ))}
        </Flex>
        <Flex gap={'10px'} style={{ marginTop: '15px' }}>
          <>
            <Flex gap={'10px'}>
              {data?.availableDate[date].departures.map((dep) => (
                <S.CustomCard width="100%" key={dep.id}>
                  <List>
                    <List.Item>
                      <Typography.Text strong>Start Date: </Typography.Text>
                      {dep.startDate}
                    </List.Item>
                    <List.Item>
                      <Typography.Text strong>End Date: </Typography.Text>
                      {dep.endDate}
                    </List.Item>
                    <List.Item>
                      <Typography.Text strong>Transfer Type: </Typography.Text>
                      <Tag color="success">{dep.transferType.toUpperCase()}</Tag>
                    </List.Item>
                    <List.Item>
                      <Typography.Text strong>Price: </Typography.Text>
                      {dep.price} $
                    </List.Item>
                  </List>
                </S.CustomCard>
              ))}
            </Flex>
          </>
        </Flex>
      </S.CustomCard> */}
      <div style={{ marginTop: '30px' }}>
        <S.CustomCard width="100%">
          <H1>Tour Itenarary: </H1>
          <Flex gap={'20px'} style={{ margin: '20px 0' }}>
            {data?.tourItenarary.map((el, idx) => (
              <>
                <S.CustomCard width="300px" key={idx}>
                  <Typography.Text strong>{el.title} </Typography.Text>
                  <Steps
                    progressDot
                    current={el.description.length}
                    direction="vertical"
                    items={el.description.map((d, i) => ({
                      title: d.hour,
                      description: <div dangerouslySetInnerHTML={{ __html: d.items[i] }} />,
                    }))}
                  />
                </S.CustomCard>
              </>
            ))}
          </Flex>
        </S.CustomCard>
      </div>
    </>
  );
};
