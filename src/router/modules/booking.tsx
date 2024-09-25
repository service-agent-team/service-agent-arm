import { ROUTES } from '@/constants';
import { RouteObject } from 'react-router-dom';
import {
  BookingBedTypeCreatePage,
  BookingBedTypeEditPage,
  BookingBedTypePage,
  BookingBreakfast,
  BookingBreakfastDetail,
  BookingFacilityCategoryCreatePage,
  BookingFacilityCategoryEditPage,
  BookingFacilityCategoryPage,
  BookingFacilityCreatePage,
  BookingFacilityEditPage,
  BookingFacilityPage,
  BookingHomePage,
  BookingPropertyPage,
  BookingRoomPage,
  BookingRoomTranslationPage,
  BookingTaxesCreatePage,
  BookingTaxesEditPage,
  BookingTaxesPage,
} from '../loadable';

export const bookingRouter: RouteObject[] = [
  {
    path: ROUTES.bookingHome,
    element: <BookingHomePage />,
  },
  {
    path: ROUTES.bookingFacility,
    children: [
      {
        index: true,
        element: <BookingFacilityPage />,
      },
      {
        path: ROUTES.add,
        element: <BookingFacilityCreatePage />,
      },
      {
        path: 'edit/:id/:languageType',
        element: <BookingFacilityEditPage />,
      },
    ],
  },
  {
    path: ROUTES.bookingFacilityCategory,
    children: [
      {
        index: true,
        element: <BookingFacilityCategoryPage />,
      },
      {
        path: ROUTES.add,
        element: <BookingFacilityCategoryCreatePage />,
      },
      {
        path: 'edit/:id/:languageType',
        element: <BookingFacilityCategoryEditPage />,
      },
    ],
  },
  {
    path: ROUTES.bookingBedType,
    children: [
      {
        index: true,
        element: <BookingBedTypePage />,
      },
      {
        path: ROUTES.add,
        element: <BookingBedTypeCreatePage />,
      },
      {
        path: 'edit/:id/:languageType',
        element: <BookingBedTypeEditPage />,
      },
    ],
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
      {
        path: ROUTES.view,
        element: <BookingBreakfastDetail />,
      },
    ],
  },
  {
    path: ROUTES.bookingTaxes,
    children: [
      {
        index: true,
        element: <BookingTaxesPage />,
      },
      {
        path: ROUTES.add,
        element: <BookingTaxesCreatePage />,
      },
      {
        path: 'edit/:id/:languageType',
        element: <BookingTaxesEditPage />,
      },
    ],
  },
  {
    path: ROUTES.bookingRoom,
    children: [
      {
        index: true,
        element: <BookingRoomPage />,
      },
      {
        path: ROUTES.view,
        element: <BookingRoomTranslationPage />,
      },
    ],
  },
  {
    path: ROUTES.bookingProperty,
    children: [
      {
        index: true,
        element: <BookingPropertyPage />,
      },
    ],
  },
];
