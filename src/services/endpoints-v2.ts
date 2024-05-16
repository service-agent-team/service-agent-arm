export const EndPointesV2 = {
  role: {
    getAll: '/api/v2/roles/get-all',
    create: '/api/v2/roles/create',
    getOne: '/api/v2/roles/get/',
    edit: '/api/v2/roles/update-role/',
    delete: '/api/v2/roles/delete-role/',
    deleteByUserRoles: '/api/v2/roles/delete/user-roles/',
  },
  agentContract: {
    allUsers: '/api/v2/agent/all',
  },
  agent: {
    contract: {
      getAllUsers: '/api/v2/agent/all',
      accept: '/api/agent/accept',
      reject: '/api/agent/reject',
      getOne: '/api/v2/agent',
      // role permission
      addRoleToUser: '/api/agent/role-permission/addRoleToUser',
      addPermissionToUser: '/api/agent/role-permission/addPermissionToUser',
      removeRoleFromUser: '/api/agent/role-permission/removeRoleFromUser',
      removePermissionFromUserRole: '/api/agent/role-permission/removePermissionFromUserRole',
      // project permission
      addProjectToUser: '/api/project-permission/addProjectToUser',
      addPermissionToUserProject: '/api/project-permission/addPermissionToUserProject',
      removeProjectFromUser: '/api/project-permission/removeProjectFromUser',
      removePermissionFromUserProject: '/api/project-permission/removePermissionFromUserProject',
    },
    getAllOrder: '/api/v2/order/all',
    getAllOrderStatistic: '/api/v2/order/statistica',
    tariff: {
      getAll: '/api/v2/tariff-category/all',
      getOne: '/api/v2/tariff-category/',
      delete: '/api/v2/tariff-category/delete/',
      create: '/api/v2/tariff-category/create/',
      update: '/api/v2/tariff-category/update/',
    },
    category: {
      getAll: '/tariff-category/category-all',
    },
    tariffPer: {
      add: '/api/v2/category/permission/create',
    },
    // projects
    project: {
      getAll: '/api/v2/agent-projects/get-all',
      getOne: '/api/v2/agent-projects/get-one',
      create: '/api/v2/agent-projects/create',
      edit: '/api/v2/agent-projects/update/',
      delete: '/api/v2/agent-projects/delete/',
    },
    // permission
    getAllPermission: ``,
    // user-roles
    createAgentRoles: '/api/v2/agent-roles/create',
    updateAgentRoles: '/api/v2/agent-roles',
    getOneAgentRoles: '/api/v2/agent-roles/get-one',
    deleteAgentRoles: '/api/v2/agent-roles/delete',
  },
  roles: {
    create: '/api/v2/role/create',
    getAll: '/api/v2/role/get-all',
    getOne: '/api/v2/role/get-one/',
    edit: '/api/v2/role/update/',
    delete: '/api/v2/role/delete/',
  },
  agentPermission: {
    create: '/api/v2/permission/create',
    getAll: '/api/v2/permission/get-all',
    getOne: '/api/v2/permission/get-one/',
    edit: '/api/v2/permission/update/',
    delete: '/api/v2/permission/delete/',
  },
} as const;
