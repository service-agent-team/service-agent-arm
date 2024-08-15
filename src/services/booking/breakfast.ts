import { createQueryString } from '@/common';
import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const BookingBreakfastService = {
  api: $axios,
  async findAll({ ...params }) {
    return await this.api.get(EndPointes.booking.breakfast + createQueryString({ ...params }));
  },
  async createBreakfast(body: any) {
    return await this.api.post(EndPointes.booking.breakfast, body);
  },
  async findOne(id: number, lang: string) {
    return await this.api.get(
      `${EndPointes.booking.breakfast}/${id}` + createQueryString({ lang }),
    );
  },
  async updateBreakfast({ id, name, lang }: { id: number; name: string; lang: string }) {
    return await this.api.put(
      `${EndPointes.booking.breakfast}/${id}` + createQueryString({ lang }),
      { name },
    );
  },
};
