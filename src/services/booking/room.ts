import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { LanguageType } from '@/common/enum';
import { ITaxeBody, ITaxeTranslationBody } from '@/store/booking/taxes/types';

export const BookingRoomService = {
  async getAll() {
    return await $axios.get(`${EndPointes.bookingRoom}`);
  },
  async getOne(id: number, lang: LanguageType) {
    return await $axios.get(`${EndPointes.bookingRoom}/${id}?lang=${lang}`);
  },
  async create(body: ITaxeBody) {
    return await $axios.post(EndPointes.bookingRoom, body);
  },
  async createTranslation(body: ITaxeTranslationBody) {
    return await $axios.post(`${EndPointes.bookingRoom}/translations`, body);
  },
  async update(id: number, lang: LanguageType, body: ITaxeBody) {
    return await $axios.put(`${EndPointes.bookingRoom}/${id}?lang=${lang}`, body);
  },
  async delete(id: number) {
    return await $axios.delete(`${EndPointes.bookingRoom}/${id}`);
  },
  async deleteTranslation(id: number, lang: LanguageType) {
    return await $axios.delete(`${EndPointes.bookingRoom}/translation/${id}?lang=${lang}`);
  },
};
