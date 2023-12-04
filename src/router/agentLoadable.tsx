/* eslint-disable prettier/prettier */
import { Loading } from '@/components';
import loadable from '@loadable/component';
const handleCatchChunkError = () => {
  return { default: Loading };
};

export const Agents = loadable(
  () => import('@/pages').then(({ Agents }) => ({ default: Agents })).catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const Videos = loadable(
  () => import('@/pages').then(({ Videos }) => ({ default: Videos })).catch(handleCatchChunkError),
  { fallback: <Loading /> },
);
