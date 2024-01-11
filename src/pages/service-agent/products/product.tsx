import { ROUTES } from '@/constants';
import { PageTitle, AgentTable } from '@/components';
import { useActions, useTypedSelector } from '@/libs';
import { useEffect } from 'react';
import { addNotification } from '@/libs/utils/addNotification';

export function Products() {
  const { getAllUsers } = useActions();
  const { status } = useTypedSelector((state) => state.agent);
  useEffect(() => {
    getAllUsers({
      callback() {
        addNotification('successfully get users');
      },
      statusName: status,
    });
  }, [status]);
  return (
    <div>
      <PageTitle title="Agents" icon="UserAddOutlined" route={ROUTES.create} label="" />
      <AgentTable />
    </div>
  );
}
