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
    },
  },
  user: {
    getAll: '/users/get-all',
    createUser: '/users/create',
  },
} as const;
