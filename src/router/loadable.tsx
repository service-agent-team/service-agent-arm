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
