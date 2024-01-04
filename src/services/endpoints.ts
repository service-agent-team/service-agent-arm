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

  transfer: {
    getAll: 'http://backend.coreteam.uz:8098/api/v1/tariff/get/all',
    createTariff: 'http://backend.coreteam.uz:8098/api/v1/tariff/add',
  },
} as const;
