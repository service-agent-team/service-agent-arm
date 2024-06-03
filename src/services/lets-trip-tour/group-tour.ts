import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const LetsTripGroupTourService = {
  async getAll(page = 0, size = 10) {
    const response = await $axios.get(
      `${EndPointes.letsTripGroupTour.getAll}?page=${page}&size=${size}`,
    );
    return response;
  },
  async getOneTour(id: string) {
    const response = await $axios.get(`${EndPointes.letsTripGroupTour.getOne}/${id}`);
    return response;
  },
  async getOneTourRaw(id: string) {
    const response = await $axios.get(`${EndPointes.letsTripGroupTour.getOneRaw}/${id}`);
    return response;
  },
  async create(body: any) {
    const response = await $axios.post(EndPointes.letsTripGroupTour.create, body);
    return response;
  },
  async updateByObject(id: number, body: { en: string; ru: string }) {
    const response = await $axios.put(EndPointes.letsTripTour.updateByObject + id, body);
    return response;
  },
  async addAvailableDate(tourId: number, body: any) {
    const response = await $axios.patch(
      `${EndPointes.letsTripGroupTour.getAll}/${tourId}/add/new-month`,
      { availableDateItem: body },
    );
    return response;
  },
  async removeAvailableDate(tourId: number, availableDateItemId: number) {
    const response = await $axios.patch(
      `${EndPointes.letsTripGroupTour.getAll}/${tourId}/remove/${availableDateItemId}`,
      {},
    );
    return response;
  },
  async addLocation(tourId: number, body: { lat: number; lng: number }) {
    const response = await $axios.post(
      `${EndPointes.letsTripGroupTour.getAll}/${tourId}/add/location`,
      body,
    );
    return response;
  },
  async removeLocation(tourId: number, locationItemId: number) {
    const response = await $axios.delete(
      `${EndPointes.letsTripGroupTour.getAll}/${tourId}/remove/${locationItemId}`,
    );
    return response;
  },
  async addImage(tourId: number, body: { images: string[] }) {
    const response = await $axios.patch(
      `${EndPointes.letsTripGroupTour.getAll}/${tourId}/add/image`,
      body,
    );
    return response;
  },
  async deleteImage(tourId: number, body: { images: string[] }) {
    const response = await $axios.patch(
      `${EndPointes.letsTripGroupTour.getAll}/${tourId}/delete/image`,
      body,
    );
    return response;
  },
  async otherUpdates(tourId: number, body: any) {
    const response = await $axios.patch(
      `${EndPointes.letsTripGroupTour.getAll}/update/${tourId}`,
      body,
    );
    return response;
  },
  async addExtraInfo(tourId: number, body: any) {
    const response = await $axios.post(
      `${EndPointes.letsTripGroupTour.getAll}/${tourId}/add/extra-info/all`,
      body,
    );
    return response;
  },
  async removeExtraInfo(tourId: number, extraInfoId: number, lang: string) {
    const response = await $axios.delete(
      `${EndPointes.letsTripGroupTour.getAll}/${tourId}/remove/extra-info/${extraInfoId}?lang=${lang}`,
    );
    return response;
  },
  async addItenarary(tourId: number, body: any) {
    const response = await $axios.post(
      `${EndPointes.letsTripGroupTour.getAll}/${tourId}/add/tour-itenarary`,
      body,
    );
    return response;
  },
  async removeItenarary(tourId: number, tourItenararyItemId: number) {
    const response = await $axios.delete(
      `${EndPointes.letsTripGroupTour.getAll}/${tourId}/remove/tour-itenarary/${tourItenararyItemId}`,
    );
    return response;
  },
  async delete(id: string) {
    const response = await $axios.delete(EndPointes.letsTripGroupTour.delete + id);
    return response;
  },
};
