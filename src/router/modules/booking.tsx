import { ROUTES } from '@/constants';
import { RouteObject } from 'react-router-dom';
import {
  BookingBreakfast,
  BookingCalendarPricingPage,
  BookingFacilityCategoryPage,
  BookingFacilityPage,
  BookingHomePage,
} from '../loadable';

export const bookingRouter: RouteObject[] = [
  {
    path: ROUTES.bookingHome,
    element: <BookingHomePage />,
  },
  {
    path: ROUTES.bookingFacility,
    element: <BookingFacilityPage />,
  },
  {
    path: ROUTES.bookingFacilityCategory,
    element: <BookingFacilityCategoryPage />,
  },
  {
    path: ROUTES.bookingCalendarPricing,
    element: <BookingCalendarPricingPage />,
  },
  {
    path: ROUTES.bookingBreakfast,
    children: [
      {
        index: true,
        element: <BookingBreakfast />,
      },
    ],
  },
];
