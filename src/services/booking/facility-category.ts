import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { IFacilityCategoryBody } from '@/store/booking/facility-category/types';
import { FacilityLanguageType } from '../../store/booking/facility/types';

export const BookingFacilityCategoryService = {
  async getAll(page = 0, size = 10) {
    return await $axios.get(
      `${EndPointes.bookingFacilityCategory.getAll}?page=${page}&size=${size}`,
    );
  },
  async getOne(id: number, lang: FacilityLanguageType) {
    return await $axios.get(`${EndPointes.bookingFacilityCategory.getAll}/${id}?lang=${lang}`);
  },
  async create(body: IFacilityCategoryBody) {
    return await $axios.post(EndPointes.bookingFacilityCategory.getAll, body);
  },
  async update(id: number, lang: FacilityLanguageType, body: IFacilityCategoryBody) {
    return await $axios.put(
      `${EndPointes.bookingFacilityCategory.getAll}/${id}?lang=${lang}`,
      body,
    );
  },
  async delete(id: number) {
    return await $axios.delete(`${EndPointes.bookingFacilityCategory.getAll}/${id}`);
  },
};
