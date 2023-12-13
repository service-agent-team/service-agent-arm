import { Loading } from '@/components';
import loadable from '@loadable/component';
import { ComponentType } from 'react';

type PagesModule = {
  [key: string]: ComponentType<any>;
};

const handleCatchChunkError = () => {
  window.location.reload();

  return { default: Loading };
};

export const getLoadablePage = (pageName: string): ComponentType =>
  loadable(
    () =>
      import('@/pages')
        .then((module: PagesModule) => ({ default: module[pageName] }))
        .catch(handleCatchChunkError),
    { fallback: <Loading /> },
  );
