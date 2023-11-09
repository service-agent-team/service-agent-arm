/* eslint-disable prettier/prettier */
import loadable from '@loadable/component';
import { Loading } from '@/components';
const handleCatchChunkError = () => {
  // window.location.reload();

  return { default: Loading };
};

export const Home = loadable(
  () => import('@/pages').then(({ Home }) => ({ default: Home })).catch(handleCatchChunkError),
  { fallback: <Loading /> },
);




export const UssdLayout = loadable(
  () => import('@/pages').then(({ UssdLayout }) => ({ default: UssdLayout })).catch(handleCatchChunkError),
  { fallback: <Loading /> },
);
