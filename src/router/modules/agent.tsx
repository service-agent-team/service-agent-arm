import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { AgentRoles, AgentTariff } from '@/pages';
import { Suspense } from 'react';
import {
  AgentControl,
  AgentHome,
  AgentProductCreate,
  AgentProducts,
  AgentProjectCreatePage,
  AgentProjectPage,
  AgentTariffsCreate,
  AgentUserPermissionCreatePage,
  AgentUserPermissionEditPage,
  AgentUserPermissionPage,
  AgentUserRoleCreatePage,
  AgentUserRoleEditPage,
  AgentUserRolePage,
  AgentView,
  CreateAgentPermission,
  CreateAgentRole,
  EditAgentPermission,
  EditAgentRole,
  Orders,
  PermissionPage,
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
    path: ROUTES.agentOrders,
    element: (
      <Suspense fallback={<Loading />}>
        <Orders />
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
    path: ROUTES.agentTariffCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentTariffsCreate />
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
  {
    path: ROUTES.agentRoleEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <EditAgentRole />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentPermission,
    element: (
      <Suspense fallback={<Loading />}>
        <PermissionPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentPermissionCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <CreateAgentPermission />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentPermisionEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <EditAgentPermission />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentUserPermission,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentUserPermissionPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentUserPermissionCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentUserPermissionCreatePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentUserPermissionEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentUserPermissionEditPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentUserRole,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentUserRolePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentUserRoleCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentUserRoleCreatePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentUserRoleEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentUserRoleEditPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentProject,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentProjectPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.agentProjectCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <AgentProjectCreatePage />
      </Suspense>
    ),
  },
];
