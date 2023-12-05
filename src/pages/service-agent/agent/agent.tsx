/* eslint-disable prettier/prettier */
<<<<<<< HEAD
import { useActions, useTypedSelector } from '@/libs/hooks';
=======
import { Cols, Rows } from '@/UI';
import { useActions, useAppSelector } from '@/libs/hooks';
>>>>>>> 9cc14a7cc27f2b4ccb4e41492ddd1e7514a7f178
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
