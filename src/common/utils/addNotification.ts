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
    if (data?.errors && data?.errors.length > 0) {
      data.errors.map((err: string) => {
        toast.error(err, {
          position: 'top-right',
        });
      });
    } else {
      toast.error(data?.message, {
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
