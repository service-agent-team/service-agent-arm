import { useActions, useTypedSelector } from '@/common/hooks';
import { Icon, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { LetsTripTransferCategoryTable } from '@/components/tables';
import { ROUTES } from '@/constants';
import { Button } from 'antd';

export const LetsTripTransferCategory = () => {
  const { getAllLetsTripTransferCategory } = useActions();
  const {
    pagination: { current, pageSize },
  } = useTypedSelector((state) => state.app);

  const restData = () => {
    getAllLetsTripTransferCategory({
      page: current,
      size: pageSize,
      deleted: false,
    });
  };
  return (
    <SimplePage>
      <PageTitle
        title="Car Categories"
        icon="PlusOutlined"
        route={ROUTES.letsTripTransferCategoryCreate}
        label="Create"
      >
        <Button
          style={{ display: 'block', marginRight: '12px' }}
          onClick={restData}
          type="primary"
          shape="circle"
        >
          <Icon name="SyncOutlined" />
        </Button>
      </PageTitle>
      <LetsTripTransferCategoryTable />
    </SimplePage>
  );
};
