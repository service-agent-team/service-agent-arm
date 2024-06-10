import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';
import { CreateGlobalRegionBody } from '@/store/lets-trip/global-region/types';

export const LetsTripGlobalRegionService = {
  async getByCountryId(countryId: number, page = 0, size = 10) {
    const response = await $axios.get(
      `${EndPointes.letsTripGlobalRegion.getByCountryId}/${countryId}?page=${page}&size=${size}`,
    );
    return response;
  },
  async create(body: CreateGlobalRegionBody) {
    const response = await $axios.post(EndPointes.letsTripGlobalRegion.create, body);
    return response;
  },
};
