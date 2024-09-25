import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { LanguageType } from '@/common/enum';
import { IRoomTranslationBody } from '@/store/booking/room/types';

export const BookingPropertyService = {
  async getAll(page: number, size: number) {
    return await $axios.get(`${EndPointes.bookingProperty}?page=${page}&size=${size}`);
  },
  async getOneTranslation(id: number) {
    return await $axios.get(`${EndPointes.bookingProperty}/${id}`);
  },
  async createTranslation(body: IRoomTranslationBody) {
    return await $axios.post(`${EndPointes.bookingProperty}/translations`, body);
  },
  async deleteTranslation(id: number, lang: LanguageType) {
    return await $axios.delete(`${EndPointes.bookingProperty}/translation/${id}?lang=${lang}`);
  },
};
