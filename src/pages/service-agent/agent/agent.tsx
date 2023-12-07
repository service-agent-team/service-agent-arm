import { useActions, useTypedSelector } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { Cols, Rows } from '@/ui';
import { useEffect } from 'react';
export default function Agents() {
  const { getAllUsers } = useActions();
  useEffect(() => {
    getAllUsers({
      callback: () => {
        addNotification('Success');
      },
    });
  }, []);

  const { data } = useTypedSelector((state) => state.contract);

  return (
    <Rows>
      {data &&
        data.map((el, i) => (
          <Cols key={i} span={4}>
            {el.firstName}
          </Cols>
        ))}
    </Rows>
  );
}
