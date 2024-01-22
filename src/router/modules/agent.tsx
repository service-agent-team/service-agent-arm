import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { AgentRoles, AgentTariff } from '@/pages';
import { Suspense } from 'react';
import {
  AgentControl,
  AgentHome,
  AgentProductCreate,
  AgentProducts,
  AgentView,
  CreateAgentRole,
} from '../loadable';

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
  {
    path: ROUTES.agentTariff,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentTariff />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentRole,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentRoles />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentRolesCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <CreateAgentRole />
      </Suspense>
    ),
  },
];
