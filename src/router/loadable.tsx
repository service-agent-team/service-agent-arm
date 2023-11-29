/* eslint-disable prettier/prettier */
import { Loading } from '@/components';
import loadable from '@loadable/component';
const handleCatchChunkError = () => {
  return { default: Loading };
};

export const Home = loadable(
  () => import('@/pages').then(({ Home }) => ({ default: Home })).catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const UssdLayout = loadable(
  () =>
    import('@/pages')
      .then(({ UssdLayout }) => ({ default: UssdLayout }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const SignIn = loadable(
  () => import('@/pages').then(({ SignIn }) => ({ default: SignIn })).catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const ProjectsPage = loadable(
  () =>
    import('@/pages')
      .then(({ ProjectsPage }) => ({ default: ProjectsPage }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);
