import { $axios } from '@/common/config';
import { EndPointes } from '../endpoints';
import { IFileResponse } from '@/components/forms/letstrip/group-tour/types';
export const FilesService = {
  async create(files: FormData) {
    const response = await $axios.post<{ files: FormData }, IFileResponse>(
      EndPointes.files.create,
      { files },
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return response;
  },
};
