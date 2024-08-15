import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { IBetTypeBody } from '@/store/booking/bed-type/types';
import { FacilityLanguageType } from '@/store/booking/facility/types';

export const BookingBedTypeService = {
  async getAll(page: number, size: number) {
    return await $axios.get(`${EndPointes.bookingBedType.getAll}?page=${page}&size=${size}`);
  },
  async getOne(id: number, lang: FacilityLanguageType) {
    return await $axios.get(`${EndPointes.bookingBedType.getAll}/${id}?lang=${lang}`);
  },
  async create(body: IBetTypeBody) {
    return await $axios.post(`${EndPointes.bookingBedType.getAll}`, body);
  },
  async update(id: number, lang: FacilityLanguageType, body: IBetTypeBody) {
    return await $axios.put(`${EndPointes.bookingBedType.getAll}/${id}?lang=${lang}`, body);
  },
  async delete(id: number) {
    return await $axios.delete(`${EndPointes.bookingBedType.getAll}/${id}`);
  },
};
