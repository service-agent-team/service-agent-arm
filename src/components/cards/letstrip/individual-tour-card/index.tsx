import { ILetsTripIndividualTourGetOne } from '@/store/lets-trip/individual-tour/types';
import NoThumbImage from '@/assets/images/no-thumbnail.png';
import { Card } from '@/components/common/card';
import { H1 } from '@/components/common';
import { Flex, List, Typography } from 'antd';
import { PageTitle } from '@/components/page-title';
import { FILE_URL } from '@/constants';
import * as S from './styled';
import { useSearchParams } from 'react-router-dom';

export const LetsTripIndividualTourCard = ({
  data,
}: {
  data: ILetsTripIndividualTourGetOne | null;
}) => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <PageTitle title={`Tour Name: ${data?.name}`} />
      <Flex style={{ margin: '30px 0' }} gap={30} wrap="wrap">
        <S.ImageBlock>
          <S.CustomImageGroup items={data?.images}>
            <S.CustomImage width={'100%'} src={data?.images[0]} fallback={NoThumbImage} />
          </S.CustomImageGroup>
          <S.Title>{data?.name}</S.Title>
          <S.InfoCard width="384px">
            <Typography.Paragraph strong style={{ marginTop: '20px' }}>
              Starting price: {data?.startingPrice} $
            </Typography.Paragraph>
            <H1>Prices: </H1>
            {data?.tourPrices.map((el) => (
              <div key={el.id}>
                <Typography.Text strong>{el.price}$</Typography.Text>
                {' ' + el.upToPersons} {`persons (per person)`}
              </div>
            ))}
          </S.InfoCard>
        </S.ImageBlock>
        <Card width="100%">
          <List>
            <H1>Tour Itenarary Starting: </H1>
            <List.Item>
              <List>
                <List.Item>
                  <Typography.Text strong>Itenarary Title: </Typography.Text>
                  {data?.tourItenarary[0].title}
                </List.Item>
                <List.Item>
                  <Typography.Text strong>Itenarary Description: </Typography.Text>{' '}
                  {data?.tourItenarary[0].description[0]}
                </List.Item>
              </List>
            </List.Item>
          </List>
        </Card>
        <Flex gap={30}>
          <Card width="100%">
            <S.VideoContainer width="100%" height="100vh" controls>
              <source
                width="600px"
                src={`${FILE_URL}/${searchParams.get('video')}`}
                type="video/mp4"
              />
            </S.VideoContainer>
          </Card>
          <Card width="100%">
            <List>
              <List.Item style={{ display: 'block' }}>
                <H1>Description</H1>
                <Typography.Paragraph>{data?.description[0]}</Typography.Paragraph>
              </List.Item>
            </List>
          </Card>
        </Flex>
      </Flex>
    </>
  );
};
