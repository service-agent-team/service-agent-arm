import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';

export const ProjectService = {
  async getAllProject() {
    const response = await $axios.get(EndPointes.project.getAll);
    return response;
  },
};
