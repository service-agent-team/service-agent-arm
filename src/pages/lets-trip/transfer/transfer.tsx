import { PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { LetsTripTransferTable } from '@/components/tables';
import { ROUTES } from '@/constants';

export const LetsTripTransfer = () => {
  return (
    <SimplePage>
      <PageTitle
        title="Transfers"
        icon="PlusOutlined"
        route={ROUTES.letsTripTransferCreate}
        label="Create"
      />
      <LetsTripTransferTable />
    </SimplePage>
  );
};
