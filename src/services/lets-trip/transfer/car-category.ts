import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';

export const LetsTripTransferCategoryService = {
  async getAllCategory(page: number, size = 10, deleted: boolean = false) {
    return await $axios.get(
      `${EndPointes.letsTripTransferCategory.getAll}?page=${page}&size=${size}&deleted=${deleted}`,
    );
  },
  async getOneTransferCategory(id: number) {
    return await $axios.get(`${EndPointes.letsTripTransferCategory.getOne}/${id}`);
  },
  async createTransferCategory(body: any) {
    return await $axios.post(EndPointes.letsTripTransferCategory.create, body);
  },
  async updateTransferCategory(id: number, body: any) {
    return await $axios.patch(`${EndPointes.letsTripTransferCategory.update}/${id}`, body);
  },
  async updateTransferCategoryImage(id: number, image: string) {
    return await $axios.patch(`${EndPointes.letsTripTransferCategory.update}/${id}/image`, {
      image,
    });
  },
  async deleteTransferCategory(id: number) {
    return await $axios.delete(`${EndPointes.letsTripTransferCategory.delete}/${id}`);
  },
};
