import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { LanguageType } from '@/common/enum';
import { IRoomTranslationBody } from '@/store/booking/room/types';

export const BookingRoomService = {
  async getAll(page: number, size: number) {
    return await $axios.get(`${EndPointes.bookingRoom}?page=${page}&size=${size}`);
  },
  async getOne(id: number) {
    return await $axios.get(`${EndPointes.bookingRoom}/${id}`);
  },
  async getOneTranslation(id: number) {
    return await $axios.get(`${EndPointes.bookingRoom}/translation/${id}`);
  },
  async createTranslation(body: IRoomTranslationBody) {
    return await $axios.post(`${EndPointes.bookingRoom}/translations`, body);
  },
  async deleteTranslation(id: number, lang: LanguageType) {
    return await $axios.delete(`${EndPointes.bookingRoom}/translation/${id}?lang=${lang}`);
  },
};
