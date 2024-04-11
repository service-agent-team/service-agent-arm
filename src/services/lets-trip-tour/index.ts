import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const LetsTripTourService = {
  async getAllTour() {
    const response = await $axios.get(`${EndPointes.letsTripTour.getAll}?page=0&size=10&lang=UZ`);
    return response;
  },
};
