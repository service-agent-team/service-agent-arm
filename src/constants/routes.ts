export const ROUTES = {
  home: '/',
  global: '/global',
  main: '/dashboard',
  resetEmail: '/email',
  login: '/signin',
  users: '/global/users',
  create: '/global/users/create',
  roles: '/global/roles',
  permissions: '/global/permissions',
  userRoles: '/global/user-roles',
  userPermission: '/global/user-permissions',
  projects: '/global/project',
  projectsPage: '/projects',

  // agent
  agent: '/service-agent',
  agentHome: `/service-agent/home`,
  agentControl: '/service-agent/control',

  // tranfer
  transfer: '/transfer',
} as const;
