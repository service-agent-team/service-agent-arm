import { ROUTES } from '@/constants';
import { RouteObject } from 'react-router-dom';
import { ProcessHomePage, ProcessProjectPage } from '../loadable';
import { Suspense } from 'react';
import { ProcessProjectForm } from '@/components';
import { ProcessDiagram } from '@/pages';

export const processRouter: RouteObject[] = [
  {
    path: ROUTES.processHome,
    element: <ProcessHomePage />,
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
      {
        path: ROUTES.processDiagramCreate,
        element: (
          <Suspense>
            <ProcessDiagram type="create" />
          </Suspense>
        ),
      },
      {
        path: ROUTES.processDiagramEdit,
        element: (
          <Suspense>
            <ProcessDiagram type="edit" />
          </Suspense>
        ),
      },
    ],
  },
];
