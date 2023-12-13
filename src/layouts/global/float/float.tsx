import { FloatButton } from 'antd';
import { Icon } from '@/components';
import { history } from '@/libs';
import { ROUTES } from '@/constants';

export const Float = () => {
  return (
    <FloatButton.Group
      trigger="hover"
      type="primary"
      icon={<img src="/white-logo.svg" height={25} width={25} />}
    >
      <FloatButton icon={<Icon name="RollbackOutlined" onClick={() => history.back()} />} />
      <FloatButton icon={<Icon name="CompressOutlined" />} />
      <FloatButton icon={<Icon name="HomeOutlined" onClick={() => history.push(ROUTES.home)} />} />
    </FloatButton.Group>
  );
};
