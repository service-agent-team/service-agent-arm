import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';

export const LetsTripIndividualTourService = {
  async getAll(page = 0, size = 10) {
    const response = await $axios.get(
      `${EndPointes.letsTripIndividualTour.getAll}?page=${page}&size=${size}&direction=ASC`,
    );
    return response;
  },
  async getByCountry(countryId: number, page = 0, size = 10) {
    const response = await $axios.get(
      `${EndPointes.letsTripIndividualTour.getByCountry}/${countryId}/?page=${page}&size=${size}&direction=ASC`,
    );
    return response;
  },
  async getOne(id: string) {
    const response = await $axios.get(`${EndPointes.letsTripIndividualTour.getOne}${id}`);
    return response;
  },
  async getOneRaw(id: string) {
    const response = await $axios.get(`${EndPointes.letsTripIndividualTour.getOne}raw/${id}`);
    return response;
  },
  async create(body: any) {
    const response = await $axios.post(EndPointes.letsTripIndividualTour.create, body);
    return response;
  },
  async addImage(tourId: number, body: { images: string[] }) {
    const response = await $axios.patch(
      `${EndPointes.letsTripIndividualTour.getAll}${tourId}/add/image`,
      body,
    );
    return response;
  },
  async removeImage(tourId: number, body: { images: string[] }) {
    const response = await $axios.patch(
      `${EndPointes.letsTripIndividualTour.getAll}${tourId}/delete/image`,
      body,
    );
    return response;
  },
  async addPrice(tourId: number, body: any) {
    const response = await $axios.patch(
      `${EndPointes.letsTripIndividualTour.getAll}${tourId}/add/tour-price`,
      body,
    );
    return response;
  },
  async removePrice(tourId: number, tourPriceId: number) {
    const response = await $axios.delete(
      `${EndPointes.letsTripIndividualTour.getAll}${tourId}/remove/tour-price/${tourPriceId}`,
    );
    return response;
  },
  async addItenarary(tourId: number, body: any) {
    const response = await $axios.patch(
      `${EndPointes.letsTripIndividualTour.getAll}${tourId}/add/tour-itenarary`,
      body,
    );
    return response;
  },
  async removeItenarary(tourId: number, tourItenararyItemId: number) {
    const response = await $axios.delete(
      `${EndPointes.letsTripIndividualTour.getAll}${tourId}/remove/tour-itenarary/${tourItenararyItemId}`,
    );
    return response;
  },
  async otherUpdates(tourId: number, body: any) {
    const response = await $axios.patch(
      `${EndPointes.letsTripIndividualTour.getAll}update/${tourId}`,
      body,
    );
    return response;
  },
  async delete(id: string) {
    const response = await $axios.delete(EndPointes.letsTripIndividualTour.delete + id);
    return response;
  },
};
