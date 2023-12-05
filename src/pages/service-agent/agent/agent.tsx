/* eslint-disable prettier/prettier */
import { Cols, Rows } from '@/UI';
import { useActions, useAppSelector } from '@/libs/hooks';
import { addNotification } from '@/libs/utils/addNotification';
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

  const { data } = useAppSelector((state) => state.contract);

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
