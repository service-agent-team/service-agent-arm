import { ROUTES } from '@/constants';
import { RouteObject } from 'react-router-dom';
import { ProcessHomePage, ProcessDiagramPage, ProcessProjectPage } from '../loadable';

export const processRouter: RouteObject[] = [
  {
    path: ROUTES.processHome,
    element: <ProcessHomePage />,
  },
  {
    path: ROUTES.processDiagram,
    children: [
      {
        index: true,
        element: <ProcessDiagramPage />,
      },
      {
        path: ROUTES.processDiagram,
        element: <ProcessDiagramPage />,
      },
    ],
  },
  {
    path: ROUTES.processProject,
    children: [
      {
        index: true,
        element: <ProcessProjectPage />,
      },
    ],
  },
];
