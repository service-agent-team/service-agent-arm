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
  agentTariff: '/service-agent/tariff',
  agentComapany: '/service-agent/company',
  agentPermission: '/service-agent/permission',
  agentRole: '/service-agent/roles',
  agentProjects: '/service-agent/projects',
  agentProducts: '/service-agent/products',
  // agent

  // tranfer
  transfer: '/transfer',
  transferHome: '/transfer/home',
  transferTariff: '/transfer/tariff',
  tariffCreate: '/transfer/tariff/create',
  transferEdit: '/transfer/tariff/edit/:id',
} as const;
