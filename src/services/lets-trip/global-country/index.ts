import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';
import {
  CreateGlobalCountryBody,
  UpdateImageGlobalCountryBody,
} from '@/store/lets-trip/global-country/types';

export const LetsTripGlobalCountryService = {
  async getAll(page = 0, size = 10) {
    const response = await $axios.get(
      `${EndPointes.letsTripGlobalCountry.getAll}?page=${page}&size=${size}`,
    );
    return response;
  },
  async create(body: CreateGlobalCountryBody) {
    const response = await $axios.post(EndPointes.letsTripGlobalCountry.create, body);
    return response;
  },
  async updateImage(body: UpdateImageGlobalCountryBody) {
    const response = await $axios.patch(EndPointes.letsTripGlobalCountry.updateImage, body);
    return response;
  },
  async deleteCountry(countryId: number) {
    const response = await $axios.patch(`${EndPointes.letsTripGlobalCountry.delete}/${countryId}`);
    return response;
  },
};
