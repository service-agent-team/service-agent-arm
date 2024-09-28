import { ROUTES } from '@/constants';
import { RouteObject } from 'react-router-dom';
import { ProcessHomePage, ProcessDiagramPage, ProcessProjectPage } from '../loadable';
import { Suspense } from 'react';
import { ProcessProjectForm } from '@/components';

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
      {
        path: ROUTES.add,
        element: (
          <Suspense>
            <ProcessProjectForm type="create" />
          </Suspense>
        ),
      },
      {
        path: ROUTES.view,
        element: (
          <Suspense>
            <ProcessProjectForm type="edit" />
          </Suspense>
        ),
      },
    ],
  },
];
