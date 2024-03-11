import { useActions, useTypedSelector } from '@/common/hooks';
import { SimplePage } from '@/components/common/page';
import { LetsTripOrderTable } from '@/components/tables/lets-trip-order';
import { LetsTripOrderStatus } from '@/store/lets-trip/order/types';
import { Select } from 'antd';

export const LetsTripOrder = () => {
  const { status } = useTypedSelector((state) => state.letsTripOrder);
  const { setOrderStatus } = useActions();
  const SelectOption = [
    { label: 'All', value: LetsTripOrderStatus.all },
    { label: 'Active', value: LetsTripOrderStatus.active },
    { label: 'Pending', value: LetsTripOrderStatus.pending },
    { label: 'No active', value: LetsTripOrderStatus.rejected },
  ];
  const changeCategory = (value: LetsTripOrderStatus) => {
    setOrderStatus(value);
  };
  return (
    <SimplePage>
      <Select
        onChange={changeCategory}
        defaultValue={status}
        style={{ width: '200px', marginBottom: '10px' }}
        options={SelectOption}
      />
      <LetsTripOrderTable />
    </SimplePage>
  );
};
