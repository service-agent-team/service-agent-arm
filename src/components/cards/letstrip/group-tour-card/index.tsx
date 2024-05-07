import { ILetsTripGroupTourGetOne } from '@/store/lets-trip/tour/types';
import NoThumbImage from '@/assets/images/no-thumbnail.png';
import { Card } from '@/components/common/card';
import { H1 } from '@/components/common';
import { Flex, Image, List, Typography } from 'antd';
import { PageTitle } from '@/components/page-title';
import { ROUTES } from '@/constants';

export const LetsTripGroupTourCard = ({ data }: { data: ILetsTripGroupTourGetOne | null }) => {
  return (
    <>
      <PageTitle
        title={`Tour Name: ${data?.name}`}
        route={ROUTES.letsTripGroupTour}
        icon="ArrowLeftOutlined"
        label="Back"
      />
      <Flex style={{ margin: '30px 0' }} justify="space-between" gap={30}>
        <Card width="100%">
          <Image.PreviewGroup items={data?.images}>
            <Image width={'100%'} src={data?.images[0]} fallback={NoThumbImage} />
          </Image.PreviewGroup>
        </Card>
        <Card width="100%">
          <List>
            <List.Item>
              <H1>Extra Information: </H1>
              <List>
                {data?.extraInformation.map((el, idx) => (
                  <List.Item key={el.title + idx}>
                    <Typography.Text strong key={el.title + idx}>
                      {el.title}:
                    </Typography.Text>
                    {' ' + el.value}
                  </List.Item>
                ))}
              </List>
            </List.Item>
            <List.Item>
              <H1>Available Date: </H1>
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
            <List.Item>
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
            </List.Item>
            <List.Item>
              <H1>Tour Starting Price: </H1>
              {data?.startingPrice}
            </List.Item>
            <List.Item>
              <Typography.Text strong>{'Latitude  Longitude'}: </Typography.Text>
              {data?.locations[0].lat} {' ->'} {data?.locations[0].lng}
            </List.Item>
          </List>
        </Card>
      </Flex>
      <Card width="100%">
        <List>
          <List.Item style={{ display: 'block' }}>
            <H1>Description</H1>
            <Typography.Paragraph>{data?.description[0]}</Typography.Paragraph>
            <H1>Itenarary Description</H1>
            <Typography.Text>{data?.tourItenarary[0].description}</Typography.Text>
          </List.Item>
        </List>
      </Card>
    </>
  );
};
