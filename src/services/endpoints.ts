export const EndPointes = {
  auth: {
    signIn: '/api/auth/login',
    getme: '/api/auth/get/me',
  },

  permissions: {
    getAll: '/api/permissions/get-all',
    getOne: '/api/permissions/get/',
    create: '/api/permissions/create',
    edit: '/api/permissions/update-permission/',
    delete: '/api/permissions/delete-permission/',
  },

  role: {
    getAll: '/api/roles/get-all',
    create: '/api/roles/create',
    getOne: '/api/roles/get/',
    edit: '/api/roles/update-role/',
    delete: '/api/roles/delete-role/',
    deleteByUserRoles: '/api/roles/delete/user-roles/',
  },

  userRole: {
    create: '/api/user-roles/create',
    getAll: '/api/user-roles/get-all',
    getOne: '/api/user-roles/get/',
    edit: '/api/user-roles/update-user-role/',
    delete: '/api/user-roles/delete-user-role/',
  },

  userPermission: {
    create: '/api/user-permissions/create',
    getAll: '/api/user-permissions/get-all',
    getOne: '/api/user-permissions/get/',
    edit: '/api/user-permissions/update-user-permission/',
    delete: '/api/user-permissions/delete-user-permission/',
  },

  // AUTH
  login: '/api/login',

  // PRODUCT
  product: {
    getByCategort: '/api/product/by',
    getOneProduct: '/api/product',
    addProduct: '/api/product/create',
    // company
    getAllCompany: '/api/company/get-all',
  },

  // PROJECT
  project: {
    getAll: '/api/projects/get-all',
    getOne: '/api/projects/get/',
    create: '/api/projects/create',
    edit: '/api/projects/update-project/',
    delete: '/api/projects/delete-project/',
  },

  // AGENT
  agentContract: {
    allUsers: '/api/agent/all',
  },

  agent: {
    contract: {
      getAllUsers: '/api/agent/all',
      accept: '/api/agent/accept',
      reject: '/api/agent/reject',
      getOne: '/api/agent',
    },
    getAllOrder: '/api/order/all',
    getAllOrderStatistic: '/api/order/statistica',
    tariff: {
      getAll: '/api/tariff-category/all',
      delete: '/api/tariff-category/delete/',
      create: '/api/tariff-category/create/',
    },
    tariffPer: {
      addTariffToUser: '/api/agent/tariff-permission/addTariffToUser',
      addPermissionToUserTariff: '/api/agent/tariff-permission/addPermissionToUserTariff',
      removeTariffFromUser: '/api/agent/tariff-permission/removeTariffFromUser',
      removePermissionFromUserTariff: '/api/agent/tariff-permission/removePermissionFromUserTariff',
    },
    // projects
    project: {
      getAll: '/api/agent-projects/get-all',
      create: '/api/agent-projects/create',
      delete: '/api/agent-projects/delete/',
    },
    // permission
    getAllPermission: ``,
    // user-roles
    createAgentRoles: '/api/agent-roles/create',
    updateAgentRoles: '/api/agent-roles',
    getOneAgentRoles: '/api/agent-roles/get-one',
    deleteAgentRoles: '/api/agent-roles/delete',
  },
  user: {
    getAll: '/api/users/get-all',
    createUser: '/api/users/create',
    delete: '/api/users/delete-user/',
    getOne: '/api/users/get/',
    edit: '/api/users/update-user/',
  },

  tariff: {
    create: '/api/tariff/create',
    getAll: '/api/tariff/get-all',
    edit: '/api/tariff/update/',
    disable: '/api/tariff/disable/',
    enable: '/api/tariff/enable/',
  },

  carType: {
    create: '/api/car-type/create',
    getAll: '/api/car-type',
    edit: '/api/car-type/',
    getOne: '/api/car-type/',
    delete: '/api/car-type/',
  },

  driver: {
    create: '/api/driver/create',
    getAll: '/api/driver/get-all',
    edit: '/api/driver/update/',
    getOne: '/api/driver/get-one/',
    delete: '/api/driver/delete/',
  },

  car: {
    createPrice: '/api/car/create/price',
    setImage: '/api/car/set/image',
    create: '/api/car/create',
    getAll: '/api/car/get-all',
    edit: '/api/car/update/',
    getOne: '/api/car/get-one/',
    delete: '/api/acr/delete/',
  },

  carModel: {
    setImage: '/api/car-model/set-image',
    create: '/api/car-model',
    update: '/api/car-model/',
    all: '/api/car-model',
    getOne: '/api/car-model/',
    delete: '/api/car-model/',
    changeImage: '/api/car-model/image/',
  },
  statistic: {
    getAll: '/api/order/get-all',
  },

  roles: {
    create: '/api/role/create',
    getAll: '/api/role/get-all',
    getOne: '/api/role/get-one/',
    edit: '/api/role/update/',
    delete: '/api/role/delete/',
  },

  permisions: {
    create: '/api/permission/create',
    getAll: '/api/permission/get-all',
    getOne: '/api/permission/get-one/',
    edit: '/api/permission/update/',
    delete: '/api/permission/delete/',
  },

  userPermissions: {
    create: '/api/agent-permission/create',
    getAll: '/api/agent-permission/all',
    getOne: '/api/agent-permission/',
    edit: '/api/agent-permission/update/',
    delete: '/api/agent-permission/delete/',
  },

  userRoles: {
    create: '/api/agent-roles/create',
    getAll: '/api/agent-roles/get-all',
    getOne: '/api/agent-roles/get-one/',
    getExist: '/api/agent-roles/get-exist/',
    edit: '/api/agent-roles/update/',
    delete: '/api/agent-roles/delete/',
  },

  letsTripGroupTour: {
    getAll: '/api/tours/group-tours',
    getOne: '/api/tours/group-tours',
    search: '/api/tours/group-tours/search',
    getOneRaw: '/api/tours/group-tours/raw',
    getByCountry: '/api/tours/group-tours/by-county',
    create: '/api/tours/group-tours',
    delete: '/api/tours/group-tours/',
  },

  letsTripTour: {
    updateByObject: '/api/tours/updateByObject/',
    updatePriceNote: '/api/tours/update/priceNote/',
    updatePriceIncludes: '/api/tours/update/price-includes/',
  },

  letsTripIndividualTour: {
    getAll: '/api/tours/individual-tours/',
    getOne: '/api/tours/individual-tours/',
    getByCountry: '/api/tours/individual-tours/by-country',
    create: '/api/tours/individual-tours/',
    delete: '/api/tours/individual-tours/',
  },

  letsTripCountry: {
    getAll: '/api/tours/countries',
    create: '/api/tours/countries',
    delete: '/api/tours/countries/',
  },

  letsTripGlobalCountry: {
    getAll: '/api/country/get-all',
    create: '/api/country/create',
    updateImage: '/api/country/update-image',
    delete: '/api/country/delete',
  },

  letsTripGlobalRegion: {
    getByCountryId: '/api/country/region',
    create: '/api/country/region/create',
  },

  letsTripTransfer: {
    getAll: '/api/transfer/car/get-all',
    search: '/api/transfer/car/search',
    getOne: '/api/transfer/car/get-one',
    getByCategoryId: '/api/transfer/car/get-by-categoryId',
    create: '/api/transfer/car/create',
    update: '/api/transfer/car/update',
    updateI18: '/api/transfer/update/i18',
    delete: '/api/transfer/car/delete',
    addDirection: '/api/transfer/car/add-directions',
    deleteDirection: '/api/transfer/car',
    countries: 'api/country/get-all',
    regions: 'api/country/region',
  },

  letsTripTransferCategory: {
    getAll: '/api/transfer/category/get-all',
    getOne: '/api/transfer/category/get-one',
    create: '/api/transfer/category/create',
    update: '/api/transfer/category/update',
    delete: '/api/transfer/category/delete',
  },

  letsTripCategory: {
    getAll: '/api/category/get-all',
    create: '/api/category/create',
    delete: '/api/category/delete/',
  },

  letsTripStatistic: {
    getAll: '/api/products/statistic/get-all',
  },

  letsTripOrder: {
    getByStatus: '/api/order/status',
  },

  files: {
    create: '/api/file',
  },
} as const;
