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
  userRolesCreate: '/global/user-roles/create',
  userRolesEdit: '/global/user-roles/edit/:id',
  userPermission: '/global/user-permissions',
  userPermissionCreate: '/global/user-permissions/create',
  userPermissionEdit: '/global/user-permissions/edit/:id',
  projects: '/global/project',
  projectsPage: '/projects',

  // agent
  agent: '/service-agent',
  agentHome: `/service-agent/home`,
  agentControl: '/service-agent/control',
  agentView: '/service-agent/view/:id',
  agentTariff: '/service-agent/tariff',
  agentTariffCreate: '/service-agent/tariff/create',
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
  agentOrdersView: '/service-agent/orders/view/:id',
  agentUserPermission: '/service-agent/user-permission',
  agentUserPermissionCreate: '/service-agent/user-permission/create',
  agentUserPermissionEdit: '/service-agent/user-permission/edit/:id',
  agentUserRole: '/service-agent/user-role',
  agentUserRoleEdit: '/service-agent/user-role/edit/:id',
  agentUserRoleCreate: '/service-agent/user-role/create',
  agentProject: '/service-agent/project',
  agentProjectCreate: '/service-agent/project/create',
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

  // lets-trip
  letstrip: '/lets-trip',
  letsTripHome: '/lets-trip/home',
  letsTripOrder: '/lets-trip/order',
  letTripLuggage: '/lets-trip/luggage',
  letsTripTour: '/lets-trip/tour',
  letsTripTourCreate: '/lets-trip/tour/create',
  letsTripTourView: '/lets-trip/tour/view/:id',
  letsTripTransfer: '/lets-trip/transfer',
  letsTripEsimGo: '/lets-trip/esimgo',
} as const;
