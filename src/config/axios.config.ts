import { BASE_URL } from '@/constants';
import axios from 'axios';

const $axios = axios.create({
  baseURL: BASE_URL,
});

// $axios.interceptors.request.use((config) => {
//   return (config.headers.Authorization = `Barear`)
// })

export default $axios;
