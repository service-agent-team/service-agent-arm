import { addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Maps } from '@/common/utils/map';
import { Icon } from '@/components/common/icon';
import { Modal } from '@/components/common/modal';
import { LetsTripOrderType } from '@/store/lets-trip/order/types';
import { Marker } from '@react-google-maps/api';
import { Badge, Button, Card, Col, Row, Tag } from 'antd';
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
          <Col span={24}>
            {order?.userId ? 'USER ID' : 'AGENT ID'}
            {': '}
            {order?.userId ? order?.userId : order?.agentId}
          </Col>
          <Col span={24}> PRICE: {Number(order?.price) / 100}$</Col>

          {/* HOTEL */}
          {type === LetsTripOrderType.HOTEL && order ? (
            <>
              <Col span={24}> HOTEL: {order?.details?.hotelName}</Col>
              <Col span={24}>
                DMC TYPE: <Tag color="success">{order?.details?.dmcType?.toUpperCase()}</Tag>
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
                  to={`https://maps.google.com?q=${order.details.latitude},${order?.details?.longitude}`}
                  target="_blank"
                >
                  https://maps.google.com?q={order.details.latitude},{order?.details?.longitude}
                </Link>
              </Col>
              <Col span={24}>
                <Maps
                  center={{ lat: order?.details?.latitude, lng: order?.details?.longitude }}
                  zoom={14}
                >
                  <Marker
                    position={{ lat: order?.details?.latitude, lng: order?.details?.longitude }}
                  />
                </Maps>
              </Col>
            </>
          ) : null}

          {/* TOUR */}
          {type === LetsTripOrderType.TOUR && order ? (
            <>
              <Col span={24}>TOUR TITLE: {order?.details?.name?.en}</Col>
              <Col span={24}>
                PHONE NUMBER:{' '}
                <a href={`tel:+${order?.details?.phoneNumber}`}>+{order?.details?.phoneNumber}</a>
              </Col>
              <Col span={24}>STARTING PRICE: {order?.details?.startingPrice / 100} $</Col>
              <Col span={24}>START DATE: {order?.details?.startDate}</Col>
              <Col span={24}>NUMBER OF TRAVELERS: {order?.details?.numberOfTravellers}</Col>
              <Col span={24}>COMMENT: {order?.details?.comment || 'no comment'}</Col>
            </>
          ) : null}

          {/* TRANSFER */}
          {type === LetsTripOrderType.TRANSFER && order ? (
            <>
              <Col span={24}>
                TRANSFER PRICE: {order?.details?.direction?.transferPrice / 100} $
              </Col>
              <Col span={24}>HOURLY PRICE: {order?.details?.direction?.hourlyPrice / 100} $</Col>
              <Col span={24}>CAR: {order?.details?.name?.en}</Col>
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
