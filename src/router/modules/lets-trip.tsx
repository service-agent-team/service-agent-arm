import { ROUTES } from '@/constants';
import {
  LetsTripByCountryTourPage,
  LetsTripCountryCreatePage,
  LetsTripCountryPage,
  LetsTripEsimGoPage,
  LetsTripFeedbackPage,
  LetsTripGlobalCountryCreatePage,
  LetsTripGlobalCountryEditPage,
  LetsTripGlobalCountryPage,
  LetsTripGlobalRegionPage,
  LetsTripGroupTourCreatePage,
  LetsTripGroupTourEditPage,
  LetsTripGroupTourPage,
  LetsTripHomePage,
  LetsTripIndividualTourCreatePage,
  LetsTripIndividualTourEditPage,
  LetsTripIndividualTourPage,
  LetsTripIndividualTourViewPage,
  LetsTripLuggagePage,
  LetsTripOrderPage,
  LetsTripTourGroupViewPage,
  LetsTripTourPage,
  LetsTripTransferCategoryCreatePage,
  LetsTripTransferCategoryEditPage,
  LetsTripTransferCategoryPage,
  LetsTripTransferCreatePage,
  LetsTripTransferEditPage,
  LetsTripTransferPage,
  LetstripNotification,
  Refferal,
} from '../loadable';
import path from 'path';

export const letsTripRouter = [
  {
    path: ROUTES.letsTripHome,
    element: <LetsTripHomePage />,
  },
  {
    path: ROUTES.letTripLuggage,
    element: <LetsTripLuggagePage />,
  },
  {
    path: ROUTES.letsTripTourOrder,
    element: <LetsTripOrderPage />,
  },
  {
    path: ROUTES.letsTripTour,
    element: <LetsTripTourPage />,
  },
  {
    path: ROUTES.letsTripTourByCountry,
    element: <LetsTripByCountryTourPage />,
  },
  {
    path: ROUTES.letsTripGroupTour,
    element: <LetsTripGroupTourPage />,
  },
  {
    path: ROUTES.letsTripGroupTourCreate,
    element: <LetsTripGroupTourCreatePage />,
  },
  {
    path: ROUTES.letsTripGroupTourView,
    element: <LetsTripTourGroupViewPage />,
  },
  {
    path: ROUTES.letsTripGroupTourEdit,
    element: <LetsTripGroupTourEditPage />,
  },
  {
    path: ROUTES.letsTripIndividualTour,
    element: <LetsTripIndividualTourPage />,
  },
  {
    path: ROUTES.letsTripIndividualTourCreate,
    element: <LetsTripIndividualTourCreatePage />,
  },
  {
    path: ROUTES.letsTripIndividualTourView,
    element: <LetsTripIndividualTourViewPage />,
  },
  {
    path: ROUTES.letsTripIndividualTourEdit,
    element: <LetsTripIndividualTourEditPage />,
  },
  {
    path: ROUTES.letsTripTransferCategoryId,
    element: <LetsTripTransferPage />,
  },
  {
    path: ROUTES.letsTripTransferCreate,
    element: <LetsTripTransferCreatePage />,
  },
  {
    path: ROUTES.letsTripTransferEdit,
    element: <LetsTripTransferEditPage />,
  },
  {
    path: ROUTES.letsTripTransferCategory,
    element: <LetsTripTransferCategoryPage />,
  },
  {
    path: ROUTES.letsTripTransferCategoryCreate,
    element: <LetsTripTransferCategoryCreatePage />,
  },
  {
    path: ROUTES.letsTripTransferCategoryEdit,
    element: <LetsTripTransferCategoryEditPage />,
  },
  {
    path: ROUTES.letsTripEsimGo,
    element: <LetsTripEsimGoPage />,
  },
  {
    path: ROUTES.letsTripCountry,
    element: <LetsTripCountryPage />,
  },
  {
    path: ROUTES.letsTripCountryCreate,
    element: <LetsTripCountryCreatePage />,
  },
  {
    path: ROUTES.letsTripGlobalCountry,
    element: <LetsTripGlobalCountryPage />,
  },
  {
    path: ROUTES.letsTripGlobalCountryCreate,
    element: <LetsTripGlobalCountryCreatePage />,
  },
  {
    path: ROUTES.letsTripGlobalCountryEdit,
    element: <LetsTripGlobalCountryEditPage />,
  },
  {
    path: ROUTES.letsTripGlobalRegionById,
    element: <LetsTripGlobalRegionPage />,
  },
  {
    path: ROUTES.reffral,
    element: <Refferal />,
  },
  {
    path: ROUTES.letstripNotification,
    element: <LetstripNotification />,
  },
  {
    path: ROUTES.letstripFeedback,
    element: <LetsTripFeedbackPage />,
  },
];
