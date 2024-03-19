import { PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { LetsTripTransferTable } from '@/components/tables';

export const LetsTripTransfer = () => {
  return (
    <SimplePage>
      <PageTitle title="Transfers" icon="PlusOutlined" route={'#'} label="Create" />
      <LetsTripTransferTable />
    </SimplePage>
  );
};
