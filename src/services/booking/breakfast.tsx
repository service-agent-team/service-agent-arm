import { createQueryString } from '@/common';
import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const BookingBreakfastService = {
  api: $axios,
  async findAll({ ...params }) {
    return await this.api.get(EndPointes.booking.breakfast + createQueryString({ ...params }));
  },
};
