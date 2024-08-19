import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { IFacilityCategoryBody } from '@/store/booking/facility-category/types';
import { LanguageType } from '@/common/enum';

export const BookingFacilityCategoryService = {
  async getAll(page = 0, size = 10) {
    return await $axios.get(
      `${EndPointes.bookingFacilityCategory.getAll}?page=${page}&size=${size}`,
    );
  },
  async getOne(id: number, lang: LanguageType) {
    return await $axios.get(`${EndPointes.bookingFacilityCategory.getAll}/${id}?lang=${lang}`);
  },
  async create(body: IFacilityCategoryBody) {
    return await $axios.post(EndPointes.bookingFacilityCategory.getAll, body);
  },
  async createTranslation(body: IFacilityCategoryBody) {
    return await $axios.post(`${EndPointes.bookingFacilityCategory.getAll}/translations`, body);
  },
  async update(id: number, lang: LanguageType, body: IFacilityCategoryBody) {
    return await $axios.put(
      `${EndPointes.bookingFacilityCategory.getAll}/${id}?lang=${lang}`,
      body,
    );
  },
  async delete(id: number) {
    return await $axios.delete(`${EndPointes.bookingFacilityCategory.getAll}/${id}`);
  },
  async deleteTranslation(id: number, lang: LanguageType) {
    return await $axios.delete(
      `${EndPointes.bookingFacilityCategory.getAll}/translation/${id}?lang=${lang}`,
    );
  },
};
