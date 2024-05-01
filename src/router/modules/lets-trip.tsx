import { Loading } from '@/components';
import {
  LetsTripHomePage,
  LetsTripLuggagePage,
  LetsTripOrderPage,
  LetsTripGroupTourPage,
  LetsTripGroupTourCreatePage,
  LetsTripTransferPage,
  LetsTripEsimGoPage,
  LetsTripTransferCreatePage,
  LetsTripGroupTourEditPage,
  LetsTripIndividualTourPage,
  LetsTripIndividualTourCreatePage,
  LetsTripIndividualTourEditPage,
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
    path: ROUTES.letsTripGroupTour,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripGroupTourPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.letsTripGroupTourCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripGroupTourCreatePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.letsTripGroupTourEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripGroupTourEditPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.letsTripIndividualTour,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripIndividualTourPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.letsTripIndividualTourCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripIndividualTourCreatePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.letsTripIndividualTourEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <LetsTripIndividualTourEditPage />
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
