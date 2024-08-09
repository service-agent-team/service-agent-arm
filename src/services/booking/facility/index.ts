import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';

export const BookingFacilityService = {
  async getAll(page = 0, size = 10) {
    return await $axios.get(`${EndPointes.bookingFacility.getAll}?page=${page}&size=${size}`);
  },
  async create(name: string) {
    return await $axios.post(EndPointes.bookingFacility.getAll, { name });
  },
  async delete(id: number) {
    return await $axios.delete(`${EndPointes.bookingFacility.getAll}/${id}`);
  },
};
