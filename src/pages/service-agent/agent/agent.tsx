/* eslint-disable prettier/prettier */
import { Rows } from '@/UI';
import { useActions } from '@/libs/hooks';
import { addNotification } from '@/libs/utils/addNotification';
import { useEffect } from 'react';
export default function Agents() {
  const { getAllUsers } = useActions();
  useEffect(() => {
    getAllUsers({
      callback: () => {
        console.log('users::::');
        addNotification('Success');
      },
    });
  }, []);

  return <Rows>slls</Rows>;
}
