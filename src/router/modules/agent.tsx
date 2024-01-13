import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { Suspense } from 'react';
import { AgentHome, AgentControl, AgentView, AgentProducts, AgentProductCreate } from '../loadable';

export const agentRouter = [
  {
    path: ROUTES.agentHome,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentHome />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentControl,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentControl />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentView,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentView />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentProducts,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentProducts />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentProductCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentProductCreate />
      </Suspense>
    ),
  },
];
