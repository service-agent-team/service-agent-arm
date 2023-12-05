import { useAppStore } from '@/store';
import { FloatButton } from 'antd';
import { Icon } from '@/components';
import { history } from '@/libs';
import { ROUTES } from '@/constants';

export const Float = () => {
  const { isAdd, path } = useAppStore();

  return (
    <FloatButton.Group
      trigger="hover"
      type="primary"
      icon={<img src="/white-logo.svg" height={25} width={25} />}
    >
      {isAdd && (
        <FloatButton icon={<Icon name="PlusOutlined" />} onClick={() => history.push(path)} />
      )}
      <FloatButton icon={<Icon name="RollbackOutlined" onClick={() => history.back()} />} />
      <FloatButton icon={<Icon name="CompressOutlined" />} />
      <FloatButton
        icon={<Icon name="HomeOutlined" onClick={() => history.push(ROUTES.buildings)} />}
      />
    </FloatButton.Group>
  );
};
