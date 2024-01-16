import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { Suspense } from 'react';
import {
  CarPage,
  CarType,
  CreateCarTypePage,
  CreateTariffPage,
  DriverCreatePage,
  DriverPage,
  EditCarTypePage,
  EditTariffPage,
  TransferHome,
  TransferTariff,
} from '../loadable';

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
  {
    path: ROUTES.transferEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <EditTariffPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.carType,
    element: (
      <Suspense fallback={<Loading />}>
        <CarType />
      </Suspense>
    ),
  },
  {
    path: ROUTES.carTypeCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <CreateCarTypePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.carTypeEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <EditCarTypePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.driver,
    element: (
      <Suspense fallback={<Loading />}>
        <DriverPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.driverCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <DriverCreatePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.car,
    element: (
      <Suspense fallback={<Loading />}>
        <CarPage />
      </Suspense>
    ),
  },
];
