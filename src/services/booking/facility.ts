import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { IFacilityBody, IFacilityTranslationBody } from '@/store/booking/facility/types';
import { LanguageType } from '@/common/enum';

export const BookingFacilityService = {
  async getAll(page = 0, size = 10) {
    return await $axios.get(`${EndPointes.bookingFacility.getAll}?page=${page}&size=${size}`);
  },
  async getOne(id: number, lang: LanguageType) {
    return await $axios.get(`${EndPointes.bookingFacility.getAll}/${id}?lang=${lang}`);
  },
  async create(body: IFacilityBody) {
    return await $axios.post(EndPointes.bookingFacility.getAll, body);
  },
  async createTranslation(body: IFacilityTranslationBody) {
    return await $axios.post(`${EndPointes.bookingFacility.getAll}/translations`, body);
  },
  async update(id: number, lang: LanguageType, body: IFacilityBody) {
    return await $axios.put(`${EndPointes.bookingFacility.getAll}/${id}?lang=${lang}`, body);
  },
  async delete(id: number) {
    return await $axios.delete(`${EndPointes.bookingFacility.getAll}/${id}`);
  },
  async deleteTranslation(id: number, lang: LanguageType) {
    return await $axios.delete(
      `${EndPointes.bookingFacility.getAll}/translation/${id}?lang=${lang}`,
    );
  },
};
