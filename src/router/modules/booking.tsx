import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { Suspense } from 'react';
import {
  BookingCalendarPricingPage,
  BookingFacilityCategoryPage,
  BookingFacilityPage,
  BookingHomePage,
} from '../loadable';

export const bookingRouter = [
  {
    path: ROUTES.bookingHome,
    element: (
      <Suspense fallback={<Loading />}>
        <BookingHomePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.bookingFacility,
    element: (
      <Suspense fallback={<Loading />}>
        <BookingFacilityPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.bookingFacilityCategory,
    element: (
      <Suspense fallback={<Loading />}>
        <BookingFacilityCategoryPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.bookingCalendarPricing,
    element: (
      <Suspense fallback={<Loading />}>
        <BookingCalendarPricingPage />
      </Suspense>
    ),
  },
];
