import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { makeErrMsg } from './general.js';

export const addNotification = (data: any) => {
  if (data instanceof AxiosError) {
    toast.error(makeErrMsg(data), {
      position: 'top-right',
    });

    return 'ok';
  } else if (typeof data === 'object') {
    if (data?.message) {
      toast.error(data.message[0], {
        position: 'top-right',
      });
    } else {
      toast.error(data?.error, {
        position: 'top-right',
      });
    }
    return 'ok';
  } else {
    toast.success(data, {
      position: 'top-right',
    });
    return 'ok';
  }
};
