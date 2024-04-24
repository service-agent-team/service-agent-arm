import { Loading } from '@/components';
import {
  LetsTripHomePage,
  LetsTripLuggagePage,
  LetsTripOrderPage,
  LetsTripTourPage,
  LetsTripTourCreatePage,
  LetsTripTransferPage,
  LetsTripEsimGoPage,
  LetsTripTransferCreatePage,
  LetsTripTourEditPage,
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
    path: ROUTES.letsTripTourEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripTourEditPage />
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
    path: ROUTES.letsTripTransferCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripTransferCreatePage />
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
