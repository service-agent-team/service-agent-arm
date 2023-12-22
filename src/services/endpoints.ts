export const EndPointes = {
  auth: {
    signIn: '/auth/login',
    getme: '/auth/get/me',
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
    createUser: '/create/user',
  },
} as const;
