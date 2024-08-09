import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';
import { ICreateFacilityPayload } from '@/store/booking/facility/types';

export const BookingFacilityCategoryService = {
  async getAll(page = 0, size = 10) {
    return await $axios.get(
      `${EndPointes.bookingFacilityCategory.getAll}?page=${page}&size=${size}`,
    );
  },
  async create(body: ICreateFacilityPayload) {
    return await $axios.post(EndPointes.bookingFacilityCategory.getAll, body);
  },
  async delete(id: number) {
    return await $axios.delete(`${EndPointes.bookingFacilityCategory.getAll}/${id}`);
  },
};
