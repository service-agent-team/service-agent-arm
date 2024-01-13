import { $axios } from '@/config';
import { EndPointes } from '../endpoints';

export const ProductService = {
  async getByCategory(categoryId: number, page: number = 0, size: number = 10) {
    const responce = await $axios.get(
      `${EndPointes.product.getByCategort}?categoryId=${categoryId}&page=${page}&size=${size}`,
    );
    return responce;
  },

  async getOneProduct(productId: number) {
    const responce = await $axios.get(`${EndPointes.product.getOneProduct}/${productId}`);
    return responce;
  },

  async postProduct(body: any) {
    const responce = await $axios.post(EndPointes.product.addProduct, body);
    return responce;
  },
};
