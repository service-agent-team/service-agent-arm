import { $axios, createQueryString } from '@/common';
import { EndPointes } from '@/services/endpoints';

export const NotificationService = {
  async getLetstripUsers(search?: string) {
    return $axios.get(
      EndPointes.letstripNotification.getLetstripUser + createQueryString({ search }),
    );
  },

  async sendNotification(body: any) {
    return $axios.post(EndPointes.letstripNotification.sendNotification, body);
  },
};
