import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { FacilityLanguageType, IFacilityBody } from '@/store/booking/facility/types';

export const BookingFacilityService = {
  async getAll(page = 0, size = 10) {
    return await $axios.get(`${EndPointes.bookingFacility.getAll}?page=${page}&size=${size}`);
  },
  async getOne(id: number, lang: FacilityLanguageType) {
    return await $axios.get(`${EndPointes.bookingFacility.getAll}/${id}?lang=${lang}`);
  },
  async create(body: IFacilityBody) {
    return await $axios.post(EndPointes.bookingFacility.getAll, body);
  },
  async update(id: number, lang: FacilityLanguageType, body: IFacilityBody) {
    return await $axios.put(`${EndPointes.bookingFacility.getAll}/${id}?lang=${lang}`, body);
  },
  async delete(id: number) {
    return await $axios.delete(`${EndPointes.bookingFacility.getAll}/${id}`);
  },
};
