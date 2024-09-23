import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { LanguageType } from '@/common/enum';
import { ITaxeBody, ITaxeTranslationBody } from '@/store/booking/taxes/types';

export const BookingTaxesService = {
  async getAll() {
    return await $axios.get(`${EndPointes.bookingTaxes}`);
  },
  async getOne(id: number, lang: LanguageType) {
    return await $axios.get(`${EndPointes.bookingTaxes}/${id}?lang=${lang}`);
  },
  async create(body: ITaxeBody) {
    return await $axios.post(EndPointes.bookingTaxes, body);
  },
  async createTranslation(body: ITaxeTranslationBody) {
    return await $axios.post(`${EndPointes.bookingTaxes}/translations`, body);
  },
  async update(id: number, lang: LanguageType, body: ITaxeBody) {
    return await $axios.put(`${EndPointes.bookingTaxes}/${id}?lang=${lang}`, body);
  },
  async delete(id: number) {
    return await $axios.delete(`${EndPointes.bookingTaxes}/${id}`);
  },
  async deleteTranslation(id: number, lang: LanguageType) {
    return await $axios.delete(`${EndPointes.bookingTaxes}/translation/${id}?lang=${lang}`);
  },
};
