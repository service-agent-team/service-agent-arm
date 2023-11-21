import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { makeErrMsg } from './general.js';

export const addNotification = (data: any) => {
  if (data instanceof AxiosError) {
    toast.error(makeErrMsg(data), {
      position: 'top-right',
    });

    return 'ok';
  }

  toast.success(data, {
    position: 'top-right',
  });
};
