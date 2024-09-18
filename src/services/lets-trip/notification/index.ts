import { $axios, createQueryString } from '@/common';
import { EndPointes } from '@/services/endpoints';

export const NotificationService = {
  async getLetstripUsers(search?: string) {
    return $axios.get(
      EndPointes.letstripNotification.getLetstripUser + createQueryString({ search }),
    );
  },

  async getAllTemplates() {
    return $axios.get(EndPointes.letstripNotification.getAllTemplates);
  },

  async sendNotification(body: any) {
    return $axios.post(EndPointes.letstripNotification.sendNotification, body);
  },
  async sendMultiNotification(body: any) {
    return $axios.post(EndPointes.letstripNotification.sendMultiNotification, body);
  },
  async sendTemplateNotification(body: any) {
    return $axios.post(EndPointes.letstripNotification.sendTemplateNotification, body);
  },
  async sendMultiTemplateNotification(body: any) {
    return $axios.post(EndPointes.letstripNotification.sendMultiTemplateNotification, body);
  },
};
