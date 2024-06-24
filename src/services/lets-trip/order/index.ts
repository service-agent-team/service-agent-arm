import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';
import { LetsTripOrderStatus, LetsTripOrderType } from '@/store/lets-trip/order/types';

export const LetsTripOrderService = {
  async getByCountryId(status: LetsTripOrderStatus, type: LetsTripOrderType, page = 0, size = 10) {
    const response = await $axios.get(
      `${EndPointes.letsTripOrder.getByStatus}?status=${status}&type=${type}&page=${page}&size=${size}`,
    );
    return response;
  },
};
