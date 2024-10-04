import { useActions, useTypedSelector } from '@/common/hooks';
import { Icon } from '@/components/common/icon';
import { Modal } from '@/components/common/modal';
import { Col, Row, Tag, Card, Button, Badge, Image, Rate } from 'antd';
import { NoThumbImage } from '@/assets';
import { addNotification } from '@/common';

export const LestTripFeedbackConfirmModal = () => {
  const { setFeedbackModal, confirmFeedback, rejectFeedback } = useActions();
  const {
    feedback,
    modal,
    loading: { post },
  } = useTypedSelector((s) => s.letsTripFeedback);

  const handleConfirm = () => {
    if (feedback) {
      confirmFeedback({
        id: feedback?.id as number,
        cb: () => {
          addNotification('Successfully confirmed feedback');
          onClose();
        },
      });
    }
  };

  const handleReject = () => {
    if (feedback) {
      rejectFeedback({
        id: feedback?.id as number,
        cb: () => {
          addNotification('Successfully reject feedback');
          onClose();
        },
      });
    }
  };

  const onClose = () => {
    setFeedbackModal({ name: 'confirm', data: false });
  };

  return (
    <Modal
      title="Filter Feedback"
      size="large"
      onCancel={onClose}
      open={modal.name === 'confirm' && modal.data}
      footer={null}
    >
      <Badge.Ribbon text={feedback?.type}>
        <Card>
          <Row style={{ width: '100%' }} gutter={[12, 12]}>
            <Col span={20}>
              <p>{feedback?.fullName}</p>
              <Tag color="cyan">{feedback?.login}</Tag>
            </Col>
            <Col span={4}>
              <Image width={80} height={100} src={feedback?.pictureURL || NoThumbImage} />
            </Col>
            <Col span={24}>{feedback?.title}</Col>
            <Col span={24}>
              <Rate value={feedback?.star} />
            </Col>
            <Col span={18}>
              <Button
                color="green"
                type="primary"
                loading={post}
                onClick={handleConfirm}
                style={{ width: '100%' }}
                icon={<Icon name="CheckOutlined" />}
              >
                Accept
              </Button>
            </Col>
            <Col span={6}>
              <Button
                danger
                type="primary"
                loading={post}
                onClick={handleReject}
                style={{ width: '100%' }}
                icon={<Icon name="CloseOutlined" />}
              >
                Reject
              </Button>
            </Col>
          </Row>
        </Card>
      </Badge.Ribbon>
    </Modal>
  );
};
