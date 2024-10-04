import { EndPointes } from '@/services/endpoints';
import { $axios } from '@/common/config';
import { FeedbackStateType, FeedbackType } from '@/store/lets-trip/feedback/types';

export const FeedbackService = {
  async getAll(type: FeedbackType, state: FeedbackStateType, page: number, size: number) {
    return await $axios.get(
      `${EndPointes.letsTripFeedback}?type=${type}&state=${state}&page=${page}&size=${size}`,
    );
  },

  async confirm(id: number) {
    return await $axios.post(`${EndPointes.letsTripFeedback}/confirm/${id}`);
  },

  async reject(id: number) {
    return await $axios.post(`${EndPointes.letsTripFeedback}/reject/${id}`);
  },
};
