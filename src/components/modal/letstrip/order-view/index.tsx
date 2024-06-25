import { useActions, useTypedSelector } from '@/common/hooks';
import { Modal } from '@/components/common/modal';
import { Badge, Card, Col, List, Row, Tag } from 'antd';

export const OrderViewModal = () => {
  const { setModal } = useActions();
  const { isModal } = useTypedSelector((state) => state.app);
  const { order } = useTypedSelector((state) => state.letsTripOrder);

  const onClose = () => {
    setModal(false);
  };

  return (
    <Modal title="Car settings" size="medium" onCancel={onClose} open={isModal} footer={null}>
      <Badge.Ribbon text={order?.status} color="green" style={{ zIndex: 10 }} />
      <Card>
        <List>
          <List.Item>
            <Row gutter={50} wrap={false}>
              <Col span={24}>Order Id: {order?.id}</Col>
              <Col span={24}>
                {order?.userId ? 'User Id' : 'Agent Id'}
                {': '}
                {order?.userId ? order?.userId : order?.agentId}
              </Col>
            </Row>
          </List.Item>
          <List.Item> Price: {Number(order?.price) / 100}$</List.Item>
          {order?.details?.tour && <List.Item>Tour name: {order.details?.tour?.name}</List.Item>}
          {order?.details?.numberOfTravelers && (
            <List.Item> Number of travels: {order?.details?.numberOfTravelers}</List.Item>
          )}

          {order?.details?.category && <List.Item>Car name: {order.details?.name?.en}</List.Item>}
          {order?.details?.category && (
            <List.Item>Car category: {order.details.category?.name?.en}</List.Item>
          )}

          {order?.details?.user && (
            <>
              <List.Item>
                <Row style={{ width: '100%' }} gutter={12}>
                  <Col span={12}>From: {order.details.from.city}</Col>
                  <Col span={12}>To: {order.details.to.city}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row style={{ width: '100%' }} gutter={12}>
                  <Col span={12}>From Hotel: {order.details.from.hotel}</Col>
                  <Col span={12}>To Hotel: {order.details.to.hotel}</Col>
                </Row>
              </List.Item>
              <List.Item>Username: {order.details.user.name}</List.Item>
              <List.Item>
                User Email: <Tag color="lime">{order.details.user.email}</Tag>
              </List.Item>
            </>
          )}
          {order?.details?.PhoneNumber && (
            <>
              <List.Item>Custom Name: {order.details?.CustomerName}</List.Item>
              <List.Item>Phone Number Price: {order.details?.phone_number_price} $</List.Item>
              <List.Item>Phone Number : {order.details?.phone_number_price} $</List.Item>
              <List.Item>
                Phone Number: <Tag color="blue">{order.details?.PhoneNumber}</Tag>
              </List.Item>
              <List.Item>
                <Row style={{ width: '100%' }} gutter={24}>
                  <Col span={12}>
                    Is Esim:{' '}
                    {order.details?.iEsim ? (
                      <Tag color="green">E-SIM</Tag>
                    ) : (
                      <Tag color="yellow">PHYSIC</Tag>
                    )}
                  </Col>
                  <Col span={12}>
                    Is Resident:{' '}
                    {order.details?.isResident ? (
                      <Tag color="info">RESIDENT</Tag>
                    ) : (
                      <Tag color="cyan">NO RESIDENT</Tag>
                    )}
                  </Col>
                </Row>
              </List.Item>
              <List.Item>Order Date: {order.details?.OrderDate}</List.Item>
            </>
          )}
        </List>
      </Card>
    </Modal>
  );
};
