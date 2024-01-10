import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { Suspense } from 'react';
import { CreateTariffPage, TransferHome, TransferTariff } from '../loadable';

export const transferRouter = [
  {
    path: ROUTES.transferHome,
    element: (
      <Suspense fallback={<Loading />}>
        <TransferHome />
      </Suspense>
    ),
  },
  {
    path: ROUTES.transferTariff,
    element: (
      <Suspense fallback={<Loading />}>
        <TransferTariff />
      </Suspense>
    ),
  },
  {
    path: ROUTES.tariffCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <CreateTariffPage />
      </Suspense>
    ),
  },
];
