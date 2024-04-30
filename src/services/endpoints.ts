export const EndPointes = {
  auth: {
    signIn: '/auth/login',
    getme: '/auth/get/me',
  },

  permissions: {
    getAll: '/permissions/get-all',
    getOne: '/permissions/get/',
    create: '/permissions/create',
    edit: '/permissions/update-permission/',
    delete: '/permissions/delete-permission/',
  },

  role: {
    getAll: '/roles/get-all',
    create: '/roles/create',
    getOne: '/roles/get/',
    edit: '/roles/update-role/',
    delete: '/roles/delete-role/',
    deleteByUserRoles: '/roles/delete/user-roles/',
  },

  userRole: {
    create: '/user-roles/create',
    getAll: '/user-roles/get-all',
    getOne: '/user-roles/get/',
    edit: '/user-roles/update-user-role/',
    delete: '/user-roles/delete-user-role/',
  },

  userPermission: {
    create: '/user-permissions/create',
    getAll: '/user-permissions/get-all',
    getOne: '/user-permissions/get/',
    edit: '/user-permissions/update-user-permission/',
    delete: '/user-permissions/delete-user-permission/',
  },

  // AUTH
  login: '/login',

  // PRODUCT
  product: {
    getByCategort: '/product/by',
    getOneProduct: '/product',
    addProduct: '/product/create',
    // company
    getAllCompany: 'company/get-all',
  },

  // PROJECT
  project: {
    getAll: '/projects/get-all',
    getOne: '/projects/get/',
    create: '/projects/create',
    edit: '/projects/update-project/',
    delete: '/projects/delete-project/',
  },

  // AGENT
  agentContract: {
    allUsers: '/agent/all',
  },

  agent: {
    contract: {
      getAllUsers: '/agent/all',
      accept: '/agent/accept',
      reject: '/agent/reject',
      getOne: '/agent',
    },
    getAllOrder: '/order/all',
    getAllOrderStatistic: '/order/statistica',
    tariff: {
      getAll: '/tariff-category/all',
      delete: '/tariff-category/delete/',
      create: '/tariff-category/create/',
    },
    tariffPer: {
      add: '/category/permission/create',
    },
    // projects
    project: {
      getAll: '/agent-projects/get-all',
      create: '/agent-projects/create',
      delete: '/agent-projects/delete/',
    },
    // permission
    getAllPermission: ``,
    // user-roles
    createAgentRoles: '/agent-roles/create',
    updateAgentRoles: '/agent-roles',
    getOneAgentRoles: '/agent-roles/get-one',
    deleteAgentRoles: '/agent-roles/delete',
  },
  user: {
    getAll: '/users/get-all',
    createUser: '/users/create',
    delete: '/users/delete-user/',
    getOne: '/users/get/',
    edit: '/users/update-user/',
  },

  tariff: {
    create: '/tariff/create',
    getAll: '/tariff/get-all',
    edit: '/tariff/update/',
    disable: '/tariff/disable/',
    enable: '/tariff/enable/',
  },

  carType: {
    create: '/car-type/create',
    getAll: '/car-type',
    edit: '/car-type/',
    getOne: '/car-type/',
    delete: '/car-type/',
  },

  driver: {
    create: '/driver/create',
    getAll: '/driver/get-all',
    edit: '/driver/update/',
    getOne: '/driver/get-one/',
    delete: '/driver/delete/',
  },

  car: {
    createPrice: '/car/create/price',
    setImage: '/car/set/image',
    create: '/car/create',
    getAll: '/car/get-all',
    edit: '/car/update/',
    getOne: '/car/get-one/',
    delete: '/acr/delete/',
  },

  carModel: {
    setImage: '/car-model/set-image',
    create: '/car-model',
    update: '/car-model/',
    all: '/car-model',
    getOne: '/car-model/',
    delete: '/car-model/',
    changeImage: '/car-model/image/',
  },
  statistic: {
    getAll: '/order/get-all',
  },

  roles: {
    create: '/role/create',
    getAll: '/role/get-all',
    getOne: '/role/get-one/',
    edit: '/role/update/',
    delete: '/role/delete/',
  },

  permisions: {
    create: '/permission/create',
    getAll: '/permission/get-all',
    getOne: '/permission/get-one/',
    edit: '/permission/update/',
    delete: '/permission/delete/',
  },

  userPermissions: {
    create: '/agent-permission/create',
    getAll: '/agent-permission/all',
    getOne: '/agent-permission/',
    edit: '/agent-permission/update/',
    delete: '/agent-permission/delete/',
  },

  userRoles: {
    create: '/agent-roles/create',
    getAll: '/agent-roles/get-all',
    getOne: '/agent-roles/get-one/',
    getExist: '/agent-roles/get-exist/',
    edit: '/agent-roles/update/',
    delete: '/agent-roles/delete/',
  },

  letsTripGroupTour: {
    getAll: '/tours/group-tours',
    getOne: '/tours/group-tours',
    getByCountry: '/tours/group-tours/by-county',
    create: '/tours/group-tours',
    delete: '/tours/group-tours',
  },

  letsTripIndividualTour: {
    getAll: '/tours/individual-tours',
    getOne: '/tours/individual-tours',
    getByCountry: '/tours/individual-tours/by-county',
    create: '/tours/individual-tours',
    delete: '/tours/individual-tours',
  },

  letsTripCountry: {
    getAll: '/tours/countries',
    create: '/tours/countries',
  },

  letsTripTransfer: {
    getAll: '/products/transfers',
    create: '/products/transfers',
  },

  category: {
    getAll: 'category/get-all',
  },
} as const;
