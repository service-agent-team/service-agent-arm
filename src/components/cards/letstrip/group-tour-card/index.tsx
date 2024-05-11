import { ILetsTripGroupTourGetOne } from '@/store/lets-trip/tour/types';
import NoThumbImage from '@/assets/images/no-thumbnail.png';
import { Card } from '@/components/common/card';
import { H1 } from '@/components/common';
import { Flex, List, Typography } from 'antd';
import { PageTitle } from '@/components/page-title';
import { ROUTES } from '@/constants';
import * as S from './styled';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export const LetsTripGroupTourCard = ({ data }: { data: ILetsTripGroupTourGetOne | null }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyALfqQ3ezC7K1GxmJ1e5EMqdQzrXdrDcdA',
  });
  const center = (data?.locations[0].lat && {
    lat: data?.locations[0].lat,
    lng: data?.locations[0].lng,
  }) ?? {
    lat: 43.45,
    lng: -80.49,
  };

  return (
    <>
      <PageTitle
        title={`Tour Name: ${data?.name}`}
        route={ROUTES.letsTripGroupTour}
        icon="ArrowLeftOutlined"
        label="Back"
      />
      <Flex style={{ margin: '30px 0' }} justify="space-between" wrap="wrap" gap={30}>
        <S.ImageBlock>
          <S.CustomImageGroup items={data?.images}>
            <S.CustomImage width={'100%'} src={data?.images[0]} fallback={NoThumbImage} />
          </S.CustomImageGroup>
          <S.Title>{data?.name}</S.Title>
          <S.InfoCard width="384px">
            <H1>Extra Information: </H1>
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
            zoom={10}
            center={center}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          ''
        )}
        <Flex style={{ width: '100%' }} justify="space-between" gap={30}>
          <S.CustomCard width="100%">
            <List>
              <List.Item>
                <H1 style={{ display: 'block' }}>Available Date: </H1>
                <List>
                  <List.Item>
                    <Typography.Text strong>Month: </Typography.Text> {data?.availableDate[0].month}
                  </List.Item>
                  <List.Item>
                    <Typography.Text strong>Year: </Typography.Text> {data?.availableDate[0].year}
                  </List.Item>
                  <List.Item>
                    <Typography.Text strong>Departures Price: </Typography.Text>
                    {data?.availableDate[0].departures[0].price}
                  </List.Item>
                  <List.Item>
                    <Typography.Text strong>Start End Date: </Typography.Text>
                    {data?.availableDate[0]?.departures[0].startDate} {'-> '}
                    {data?.availableDate[0]?.departures[0].endDate}
                  </List.Item>
                  <List.Item>
                    <Typography.Text strong>Departures Transfer Type: </Typography.Text>
                    {data?.availableDate[0]?.departures[0].transferType}
                  </List.Item>
                </List>
              </List.Item>
            </List>
          </S.CustomCard>
          <S.CustomCard width="100%">
            <H1>Tour Itenarary: </H1>
            <List>
              <List.Item>
                <Typography.Text strong>Title: </Typography.Text>
                {data?.tourItenarary[0].title}
              </List.Item>
              <List.Item>
                <Typography.Text strong>Hour: </Typography.Text>
                {data?.tourItenarary[0].hour}
              </List.Item>
            </List>
            <List>
              <List.Item>
                <H1>Tour Starting Price: </H1>
                {data?.startingPrice}
              </List.Item>
              <List.Item>
                <Typography.Text strong>{'Latitude  Longitude'}: </Typography.Text>
                {data?.locations[0].lat} {' ->'} {data?.locations[0].lng}
              </List.Item>
            </List>
          </S.CustomCard>
        </Flex>
      </Flex>
      <Card width="100%">
        <List>
          <List.Item style={{ display: 'block' }}>
            <H1>Itenarary Description</H1>
            <Typography.Text>{data?.tourItenarary[0].description[0].items[0]}</Typography.Text>
          </List.Item>
        </List>
      </Card>
    </>
  );
};
