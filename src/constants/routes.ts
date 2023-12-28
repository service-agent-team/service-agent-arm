export const ROUTES = {
  home: '/',
  global: '/global',
  globalHome: '/global/home',
  main: '/dashboard',
  resetEmail: '/email',
  login: '/signin',
  users: '/global/users',
  create: '/global/users/create',
  roles: '/global/roles',
  permissions: '/global/permissions',
  permissionCreate: '/global/permissions/create',
  userRoles: '/global/user-roles',
  userPermission: '/global/user-permissions',
  projects: '/global/project',
  projectsPage: '/projects',

  // agent
  agent: '/service-agent',
  agentHome: `/service-agent/home`,
  agentControl: '/service-agent/control',
  agentView: '/service-agent/view/:id',

  // tranfer
  transfer: '/transfer',
} as const;
