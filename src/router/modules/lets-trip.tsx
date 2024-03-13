import { Loading } from '@/components';
import {
  LetsTripHomePage,
  LetsTripLuggagePage,
  LetsTripOrderPage,
  LetsTripTourPage,
  LetsTripTourCreatePage,
  LetsTripTransferPage,
  LetsTripEsimGoPage,
} from '../loadable';
import { ROUTES } from '@/constants';
import { Suspense } from 'react';

export const letsTrip = [
  {
    path: ROUTES.letsTripHome,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripHomePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.letTripLuggage,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripLuggagePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.letsTripOrder,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripOrderPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.letsTripTour,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripTourPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.letsTripTourCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripTourCreatePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.letsTripTransfer,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripTransferPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.letsTripEsimGo,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripEsimGoPage />
      </Suspense>
    ),
  },
];
