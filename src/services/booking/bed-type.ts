import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { IBetTypeBody, IBetTypeTranslationBody } from '@/store/booking/bed-type/types';
import { LanguageType } from '@/common/enum';

export const BookingBedTypeService = {
  async getAll(page: number, size: number) {
    return await $axios.get(`${EndPointes.bookingBedType.getAll}?page=${page}&size=${size}`);
  },
  async getOne(id: number, lang: LanguageType) {
    return await $axios.get(`${EndPointes.bookingBedType.getAll}/${id}?lang=${lang}`);
  },
  async create(body: IBetTypeBody) {
    return await $axios.post(`${EndPointes.bookingBedType.getAll}`, body);
  },
  async createTranslation(body: IBetTypeTranslationBody) {
    return await $axios.post(`${EndPointes.bookingBedType.getAll}/translations`, body);
  },
  async update(id: number, lang: LanguageType, body: IBetTypeBody) {
    return await $axios.put(`${EndPointes.bookingBedType.getAll}/${id}?lang=${lang}`, body);
  },
  async delete(id: number) {
    return await $axios.delete(`${EndPointes.bookingBedType.getAll}/${id}`);
  },
  async deleteTranslation(id: number, lang: LanguageType) {
    return await $axios.delete(
      `${EndPointes.bookingBedType.getAll}/translation/${id}?lang=${lang}`,
    );
  },
};
