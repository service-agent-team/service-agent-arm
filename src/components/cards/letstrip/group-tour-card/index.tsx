import { ILetsTripGroupTourGetOne } from '@/store/lets-trip/group-tour/types';
import NoThumbImage from '@/assets/images/no-thumbnail.png';
import { H1 } from '@/components/common';
import { Flex, List, Steps, Typography } from 'antd';
import { PageTitle } from '@/components/page-title';
import * as S from './styled';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
// import { useState } from 'react';

export const LetsTripGroupTourCard = ({ data }: { data: ILetsTripGroupTourGetOne | null }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyALfqQ3ezC7K1GxmJ1e5EMqdQzrXdrDcdA',
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
      <PageTitle title={`Tour Name: ${data?.name}`} />
      <Flex style={{ margin: '30px 0' }} justify="space-between" wrap="wrap" gap={30}>
        <S.ImageBlock>
          <S.CustomImageGroup items={data?.images}>
            <S.CustomImage width={'100%'} src={data?.images[0]} fallback={NoThumbImage} />
          </S.CustomImageGroup>
          <S.Title>{data?.name}</S.Title>
          <S.InfoCard width="384px">
            <Typography.Text strong>Starting Price: </Typography.Text>
            {Number(data?.startingPrice) / 100} $<H1>Extra Information: </H1>
            <List>
              {data?.extraInformation.map((el, idx) => (
                <List.Item key={el.title + idx}>
                  {el.title}:
                  <Typography.Paragraph strong key={el.title + idx}>
                    {el.value}
                  </Typography.Paragraph>
                </List.Item>
              ))}
            </List>
          </S.InfoCard>
        </S.ImageBlock>
        <div>
          <H1 style={{ fontSize: '32px' }}>Description</H1>
          <Typography.Paragraph style={{ maxWidth: '990px', fontSize: '20px' }}>
            {data?.description[0]}
          </Typography.Paragraph>
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
                    items={el.description.map((d) => ({ title: d.hour, description: d.items[0] }))}
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
