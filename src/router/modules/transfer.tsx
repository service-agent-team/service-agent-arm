import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { Suspense } from 'react';
import { TransferHome } from '../loadable';

export const transferRouter = [
  {
    path: ROUTES.transferHome,
    element: (
      <Suspense fallback={<Loading />}>
        <TransferHome />
      </Suspense>
    ),
  },
];
