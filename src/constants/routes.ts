export const ROUTES = {
  view: ':id',
  add: 'create',
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
  roleCreate: '/global/roles/crate',
  roleEdit: '/global/roles/edit/:id',
  permissions: '/global/permissions',
  permissionCreate: '/global/permissions/create',
  permissionEdit: '/global/permissions/edit/:id',
  userRoles: '/global/user-roles',
  userRolesCreate: '/global/user-roles/create',
  userRolesEdit: '/global/user-roles/edit/:id',
  userPermission: '/global/user-permissions',
  userPermissionCreate: '/global/user-permissions/create',
  userPermissionEdit: '/global/user-permissions/edit/:id',
  projects: '/global/project',
  projectCreate: '/global/project/create',
  projectEdit: '/global/project/edit/:id',
  projectsPage: '/projects',

  // agent
  agent: '/service-agent',
  agentHome: `/service-agent/home`,
  agentControl: '/service-agent/control',
  agentView: '/service-agent/view/:id',
  agentTariff: '/service-agent/tariff',
  agentTariffCreate: '/service-agent/tariff/create',
  agentTariffEdit: '/service-agent/tariff/edit/:id',
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
  agentProjectEdit: '/service-agent/project/edit/:id',
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
  letsTripOrder: '/lets-trip/order/',
  letsTripTourOrder: '/lets-trip/order/:project',
  letsTripTransferOrder: '/lets-trip/order/:project',
  letsTripSimOrder: '/lets-trip/order/:project',
  letsTripLuggageOrder: '/lets-trip/order/:project',
  letTripLuggage: '/lets-trip/luggage',
  letsTripTour: '/lets-trip/tour',
  letsTripTourByCountry: '/lets-trip/tour/by-country/:countryId/:tourType',
  letsTripGroupTour: '/lets-trip/group-tour',
  letsTripGroupTourCreate: '/lets-trip/tour/by-country/:countryId/group/create',
  letsTripGroupTourEdit: '/lets-trip/tour/by-country/:countryId/group/edit/:id',
  letsTripGroupTourView: '/lets-trip/group-tour/view/:id',
  letsTripIndividualTour: '/lets-trip/individual-tour',
  letsTripIndividualTourCreate: '/lets-trip/tour/by-country/:countryId/individual/create',
  letsTripIndividualTourEdit: '/lets-trip/tour/by-country/:countryId/individual/edit/:id',
  letsTripIndividualTourView: '/lets-trip/individual-tour/view/:id',
  letsTripTransfer: '/lets-trip/transfer',
  letsTripTransferCreate: '/lets-trip/transfer/create',
  letsTripTransferEdit: '/lets-trip/transfer/edit/:id',
  letsTripTransferCategory: '/lets-trip/transfer-category',
  letsTripTransferCategoryId: '/lets-trip/transfer-category/:id',
  letsTripTransferCategoryCreate: '/lets-trip/transfer-category/create',
  letsTripTransferCategoryEdit: '/lets-trip/transfer-category/edit/:id',
  letsTripEsimGo: '/lets-trip/esimgo',
  letsTripCountry: '/lets-trip/country',
  letsTripCountryCreate: '/lets-trip/country/create',
  letsTripCountryEdit: '/lets-trip/country/edit/:id',
  letsTripGlobalCountry: '/lets-trip/global-country',
  letsTripGlobalCountryCreate: '/lets-trip/global-country/create',
  letsTripGlobalRegion: '/lets-trip/global-region',
  letsTripGlobalRegionById: '/lets-trip/global-region/:id',
  letsTripGlobalRegionCreate: '/lets-trip/global-region/create',
  letsTripGlobalCountryEdit: '/lets-trip/global-country/edit/:id',
  reffral: '/lets-trip/refferal',
  letsTripHotelOrder: '/lets-trip/hotel-order',
  letstripNotification: '/lets-trip/notification',

  // language
  languageHome: '/language/home',

  // booking
  booking: '/booking',
  bookingHome: '/booking/home',
  bookingFacility: '/booking/facility',
  bookingFacilityCreate: '/booking/facility/create',
  bookingFacilityEdit: '/booking/facility/edit/:id/:languageType',
  bookingFacilityCategory: '/booking/facility-category',
  bookingFacilityCategoryCreate: '/booking/facility-category/create',
  bookingFacilityCategoryEdit: '/booking/facility-category/edit/:id/:languageType',
  bookingBedType: '/booking/bed-type',
  bookingBedTypeCreate: '/booking/bed-type/create',
  bookingBreakfast: '/booking/breakfast',
  bookingTaxes: '/booking/taxes',
  bookingTaxesCreate: '/booking/taxes/create',

  // process
  process: '/process',
  processHome: '/process/home',
} as const;
