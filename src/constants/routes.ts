export const ROUTES = {
  home: '/',
  global: '/global',
  globalHome: '/global/home',
  main: '/dashboard',
  resetEmail: '/email',
  login: '/signin',
  users: '/global/users',
  editUsers: '/global/users/edit/:id',
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
  agentPermission: '/service-agent/permissions',
  agentPermissionCreate: '/service-agent/permissions/create',
  agentPermisionEdit: '/service-agent/permissions/edit/:id',
  agentRole: '/service-agent/roles',
  agentRolesCreate: '/service-agent/roles/create',
  agentRoleEdit: '/service-agent/roles/edit/:id',
  agentProjects: '/service-agent/projects',
  agentProducts: '/service-agent/products',
  agentProductCreate: '/service-agent/products/create',
  agentOrders: '/service-agent/orders',
  // agent

  // tranfer
  transfer: '/transfer',
  transferHome: '/transfer/home',
  transferTariff: '/transfer/tariff',
  tariffCreate: '/transfer/tariff/create',
  transferEdit: '/transfer/tariff/edit/:id',
  carType: '/transfer/car-type',
  carTypeCreate: '/transfer/car-type/create',
  carTypeEdit: '/transfer/car-type/edit/:id',
  car: '/transfer/cars',
  carCreate: '/transfer/cars/create',
  editCar: '/transfer/cars/edit/:id',
  carModel: '/transfer/car-model',
  carModelCreate: '/transfer/car-model/create',
  carModelupdate: '/transfer/car-model/update',
} as const;
