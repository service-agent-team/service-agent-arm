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
} as const;
