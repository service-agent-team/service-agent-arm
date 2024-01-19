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
    tariff: {
      getAll: '/category/all',
    },
    tariffPer: {
      add: '/category/permission/create',
    },
    // permission
    getAllPermission: ``,
    // user-rols
    createAgentRoles: '/agent-roles/create',
    updateAgentRoles: '/agent-roles',
    getOneAgentRoles: '/agent-roles/get-one',
    deleteAgentRoles: '/agent-roles/delete',
  },
  user: {
    getAll: '/users/get-all',
    createUser: '/users/create',
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
    getAll: '/car-type/get-all',
    edit: '/car-type/update/',
    getOne: '/car-type/get-one/',
    delete: '/car-type/delete/',
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
    create: '/car-model/create',
    update: '/car-model/update',
    all: '/car-model/get-all',
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

  userRoles: {
    create: '/agent-roles/create',
    getAll: '/agent-roles/get-all',
    getOne: '/agent-roles/get-one/',
    getExist: '/agent-roles/get-exist/',
    edit: '/agent-roles/update/',
    delete: '/agent-roles/delete/',
  },
} as const;
