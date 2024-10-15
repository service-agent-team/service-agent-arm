import { addNotification, IMAGE_OPEN_URL } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Maps } from '@/common/utils/map';
import { Icon } from '@/components/common/icon';
import { Modal } from '@/components/common/modal';
import { LetsTripOrderType } from '@/store/lets-trip/order/types';
import { Marker, Polyline } from '@react-google-maps/api';
import { Badge, Button, Card, Col, Image, Row, Tag } from 'antd';
import { Link } from 'react-router-dom';

export const OrderViewModal = () => {
  const { setModal } = useActions();
  const { isModal } = useTypedSelector((state) => state.app);
  const { order } = useTypedSelector((state) => state.letsTripOrder);
  const { type } = useTypedSelector((state) => state.letsTripOrder);

  const onClose = () => {
    setModal(false);
  };

  return (
    <Modal
      title={`${type?.toUpperCase()} order view`}
      size="large"
      onCancel={onClose}
      open={isModal}
      footer={null}
    >
      <Badge.Ribbon
        text={order?.status}
        color="green"
        style={{ zIndex: 10, top: '3px !important', right: '5px !important' }}
      />
      <Card>
        <Row gutter={[12, 12]}>
          {order?.userId ? (
            <>
              <Col span={12}>
                FULL NAME: {order?.user?.firstName} {order?.user?.lastName}
              </Col>
              <Col span={12}>
                PHONE NUMBER:{' '}
                <a href={`tel:+${order?.details?.phoneNumber}`}>+{order?.details?.phoneNumber}</a>
              </Col>
              <Col span={12}>
                EMAIL: <a href={`mailto:${order?.user?.login}`}>{order?.user?.login}</a>
              </Col>
              <Col span={12}>
                GENDER:{' '}
                <Tag color={order?.user?.gender === 'MALE' ? 'blue' : 'pink'}>
                  {order?.user?.gender}
                </Tag>
              </Col>
              <Col span={12}>
                COUNTRY: <Tag color={'cyan'}>{order?.user?.countryName}</Tag>
              </Col>
              <Col span={12}>
                LANGUAGE: <Tag color={'green'}>{order?.user?.language}</Tag>
              </Col>
            </>
          ) : (
            <>
              <Col span={19}>
                AGENT FULL NAME: {order?.agent?.firstName} {order?.agent?.lastName}{' '}
                {order?.agent?.middleName}
              </Col>
              <Col span={5}>
                <Tag color="cyan-inverse">{order?.agent?.contractStatus}</Tag>
              </Col>
              <Col span={12}>
                GENDER:{' '}
                <Tag color={order?.agent?.gender === 'MALE' ? 'blue' : 'pink'}>
                  {order?.agent?.gender || '-'}
                </Tag>
              </Col>
              <Col span={12}>
                LOGIN: <a href={`tel:+${order?.agent?.login}`}>+{order?.agent?.login}</a>
              </Col>
            </>
          )}

          <Col span={12}>
            PAYMENT TYPE: <Tag color="blue">{order?.paymentType}</Tag>
          </Col>

          <Col span={12}> PRICE: {Number(order?.price) / 100}$</Col>

          {/* HOTEL */}
          {type === LetsTripOrderType.HOTEL && order ? (
            <>
              <Col span={24}> HOTEL: {order?.details?.hotelName}</Col>
              <Col span={24}> ROOM NAME: {order?.details?.roomName}</Col>
              <Col span={24}>
                DMC TYPE: <Tag color="success">{order?.details?.dmcType?.toUpperCase()}</Tag>
              </Col>
              <Col span={24}>
                <Icon name="ClockCircleOutlined" /> Check in: {order?.details?.checkIn}
              </Col>
              <Col span={24}>
                <Icon name="CheckSquareOutlined" /> Check out: {order?.details?.checkOut}
              </Col>

              {/* ROOMS & GUESTS */}
              <Col span={24}>
                ROOMS:
                <Row gutter={[10, 10]}>
                  {order?.details?.rooms?.map((r: any, key: number) => (
                    <Col key={key} span={24}>
                      <Badge.Ribbon text={`Room ${key + 1}`}>
                        <Card>
                          <Row gutter={[10, 10]}>
                            {r?.guests?.map((g: any, i: number) => (
                              <Col key={`${key}-${i}`} span={24}>
                                <Badge.Ribbon
                                  color={`${g?.isChild ? 'cyan' : 'grey'}`}
                                  text={`${g?.isChild ? 'Child' : 'Guest'} ${i + 1}`}
                                >
                                  <Card>
                                    <Row gutter={[10, 10]}>
                                      <Col span={g?.isChild ? 8 : 12}>
                                        First name: {g?.firstName}
                                      </Col>
                                      <Col span={g?.isChild ? 8 : 12}>Last name: {g?.lastName}</Col>
                                      {g?.isChild ? <Col span={8}>Age: {g?.age}</Col> : null}
                                    </Row>
                                  </Card>
                                </Badge.Ribbon>
                              </Col>
                            ))}
                          </Row>
                        </Card>
                      </Badge.Ribbon>
                    </Col>
                  ))}
                </Row>
              </Col>

              <Col span={24}>
                EMAIL: <Link to={`mailto:${order?.details?.email}`}>{order?.details?.email}</Link>
              </Col>
              <Col span={24}>
                PHONE NUMBER:{' '}
                <Link to={`tel:+${order?.details?.phoneNumber}`}>
                  +{order?.details?.phoneNumber}
                </Link>
              </Col>
              <Col span={24}>
                <Button
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://maps.google.com?q=${order.details.latitude},${order?.details?.longitude}`,
                    );
                    addNotification('Copy to clipboard');
                  }}
                  type="primary"
                  icon={<Icon name="CopyOutlined" />}
                />
                {'\t LOCATION: '}
                <Link
                  to={`https://maps.google.com?q=${order?.details?.center?.latitude},${order?.details?.center?.longitude}`}
                  target="_blank"
                >
                  https://maps.google.com?q={order?.details?.center?.latitude},
                  {order?.details?.center?.longitude}
                </Link>
              </Col>
              <Col span={24}>
                <Maps
                  center={{
                    lat: order?.details?.center?.latitude,
                    lng: order?.details?.center?.longitude,
                  }}
                  zoom={14}
                >
                  <Marker
                    position={{
                      lat: order?.details?.center?.latitude,
                      lng: order?.details?.center?.longitude,
                    }}
                  />
                </Maps>
              </Col>
            </>
          ) : null}

          {/* TOUR */}
          {type === LetsTripOrderType.TOUR && order ? (
            <>
              <Col span={24}>TOUR TITLE: {order?.tour?.name?.en}</Col>
              <Col span={24}>START DATE: {order?.details?.startDate}</Col>
              <Col span={24}>NUMBER OF TRAVELERS: {order?.details?.numberOfTravellers}</Col>
              <Col span={24}>COMMENT: {order?.details?.comment || 'no comment'}</Col>
            </>
          ) : null}

          {/* TRANSFER */}
          {type === LetsTripOrderType.TRANSFER && order ? (
            <>
              <Col span={24}>TRANSFER: {order?.car?.name?.en}</Col>
              <Col span={24}>
                TRANSFER PRICE: {order?.details?.direction?.transferPrice / 100} $
              </Col>
              <Col span={24}>HOURLY PRICE: {order?.details?.direction?.hourlyPrice / 100} $</Col>
              <Col span={24}>
                DESTINATION: {order?.details?.direction?.sourceBoundary?.name?.en} {' -> '}
                {order?.details?.direction?.destinationBoundary?.name?.en}
              </Col>
              <Col span={24}>
                <Maps
                  center={{
                    lat: order?.details?.pickUpLocation?.latitude,
                    lng: order?.details?.pickUpLocation?.longitude,
                  }}
                  zoom={11}
                >
                  <Marker
                    position={{
                      lat: order?.details?.pickUpLocation?.latitude,
                      lng: order?.details?.pickUpLocation?.longitude,
                    }}
                  />
                  <Marker
                    position={{
                      lat: order?.details?.destination?.latitude,
                      lng: order?.details?.destination?.longitude,
                    }}
                  />
                  <Polyline
                    path={[
                      {
                        lat: order?.details?.pickUpLocation?.latitude,
                        lng: order?.details?.pickUpLocation?.longitude,
                      },
                      {
                        lat: order?.details?.destination?.latitude,
                        lng: order?.details?.destination?.longitude,
                      },
                    ]}
                    options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 }}
                  />
                </Maps>
              </Col>
            </>
          ) : null}

          {/* SIM */}
          {type === LetsTripOrderType.SIM_CARD && order ? (
            <>
              <Col span={24}>CUSTOMER NAME: {order?.details?.CustomerName}</Col>
              <Col span={12}>
                PHONE NUMBER:{' '}
                <a href={`tel:+${order?.details?.PhoneNumber}`}>+{order?.details?.PhoneNumber}</a>
              </Col>
              <Col span={12}>ORDER DATE: {order?.details?.OrderDate}</Col>
              <Col span={12}>
                SIM TYPE:{' '}
                <Tag color={order?.details?.isEsim ? 'green' : 'red'}>
                  {order?.details?.isEsim ? 'E-SIM' : 'PHYSICALLY'}
                </Tag>
              </Col>
              <Col span={12}>
                is RESIDENT:{' '}
                <Tag color={order?.details?.isResident ? 'green' : 'red'}>
                  {order?.details?.isResident ? 'YES' : 'NO'}
                </Tag>
              </Col>
            </>
          ) : null}

          {/* LUGGAGE */}
          {type === LetsTripOrderType.LUGGAGE && order ? (
            <>
              <Col span={12}>
                from: {order?.details?.from?.city}, {order.details?.from?.place}
              </Col>
              <Col span={12}>
                to: {order?.details?.to?.city}, {order.details?.to?.place}
              </Col>
              {order.details?.cart?.map((cart: any, i: number) => (
                <Card key={i} style={{ width: '100%' }}>
                  <Row gutter={[10, 10]} align={'middle'}>
                    <Col span={10}>
                      BARCODE: <Tag color="cyan">#{cart?.barcode}</Tag>
                    </Col>
                    <Col span={10}>AMOUNT: {cart?.amount}</Col>
                    <Col span={4}>
                      <Image
                        width={60}
                        height={40}
                        src={`${IMAGE_OPEN_URL}/${cart?.imageIds[i]}`}
                      />
                    </Col>
                  </Row>
                </Card>
              ))}
            </>
          ) : null}

          <Col span={24}>
            <Button style={{ width: '100%' }} type="primary" onClick={() => setModal(false)}>
              Close
            </Button>
          </Col>
        </Row>
      </Card>
    </Modal>
  );
};
