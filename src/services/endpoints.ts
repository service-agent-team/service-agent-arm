export const EndPointes = {
  auth: {
    signIn: '/auth/login',
    getme: '/auth/get/me',
  },

  permissions: {
    getAll: '/permissions/get-all',
    create: '/permissions/create',
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
      getAll: '/category/all',
    },
    tariffPer: {
      add: '/category/permission/create',
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

  userRoles: {
    create: '/agent-roles/create',
    getAll: '/agent-roles/get-all',
    getOne: '/agent-roles/get-one/',
    getExist: '/agent-roles/get-exist/',
    edit: '/agent-roles/update/',
    delete: '/agent-roles/delete/',
  },
} as const;
