import { ROUTES } from '@/constants';
import { RouteObject } from 'react-router-dom';
import {
  BookingBreakfast,
  BookingBreakfastDetail,
  BookingCalendarPricingPage,
  BookingFacilityCategoryCreatePage,
  BookingFacilityCategoryEditPage,
  BookingFacilityCategoryPage,
  BookingFacilityCreatePage,
  BookingFacilityEditPage,
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
    path: ROUTES.bookingFacilityCreate,
    element: <BookingFacilityCreatePage />,
  },
  {
    path: ROUTES.bookingFacilityEdit,
    element: <BookingFacilityEditPage />,
  },
  {
    path: ROUTES.bookingFacilityCategory,
    element: <BookingFacilityCategoryPage />,
  },
  {
    path: ROUTES.bookingFacilityCategoryCreate,
    element: <BookingFacilityCategoryCreatePage />,
  },
  {
    path: ROUTES.bookingFacilityCategoryEdit,
    element: <BookingFacilityCategoryEditPage />,
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
      {
        path: ROUTES.add,
        element: <BookingBreakfastDetail />,
      },
    ],
  },
];
