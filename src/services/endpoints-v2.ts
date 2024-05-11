export const EndPointesV2 = {
  // auth: {
  //   signIn: '/v2/auth/login',
  //   getme: '/v2/auth/get/me',
  // },
  // permissions: {
  //   getAll: '/v2/permissions/get-all',
  //   getOne: '/v2/permissions/get/',
  //   create: '/v2/permissions/create',
  //   edit: '/v2/permissions/update-permission/',
  //   delete: '/v2/permissions/delete-permission/',
  // },
  role: {
    getAll: '/v2/roles/get-all',
    create: '/v2/roles/create',
    getOne: '/v2/roles/get/',
    edit: '/v2/roles/update-role/',
    delete: '/v2/roles/delete-role/',
    deleteByUserRoles: '/v2/roles/delete/user-roles/',
  },
  // userRole: {
  //   create: '/v2/user-roles/create',
  //   getAll: '/v2/user-roles/get-all',
  //   getOne: '/v2/user-roles/get/',
  //   edit: '/v2/user-roles/update-user-role/',
  //   delete: '/v2/user-roles/delete-user-role/',
  // },
  // userPermission: {
  //   create: '/v2/user-permissions/create',
  //   getAll: '/v2/user-permissions/get-all',
  //   getOne: '/v2/user-permissions/get/',
  //   edit: '/v2/user-permissions/update-user-permission/',
  //   delete: '/v2/user-permissions/delete-user-permission/',
  // },
  // // AUTH
  // login: '/v2/login',
  // // PRODUCT
  // product: {
  //   getByCategort: '/v2/product/by',
  //   getOneProduct: '/v2/product',
  //   addProduct: '/v2/product/create',
  //   // company
  //   getAllCompany: 'company/get-all',
  // },
  // // PROJECT
  // project: {
  //   getAll: '/v2/projects/get-all',
  //   getOne: '/v2/projects/get/',
  //   create: '/v2/projects/create',
  //   edit: '/v2/projects/update-project/',
  //   delete: '/v2/projects/delete-project/',
  // },
  // // AGENT
  agentContract: {
    allUsers: '/v2/agent/all',
  },
  agent: {
    contract: {
      getAllUsers: '/v2/agent/all',
      accept: '/agent/accept',
      reject: '/agent/reject',
      getOne: '/v2/agent',
      addRoleToUser: '/agent/role-permission/addRoleToUser',
      addPermissionToUser: 'agent/role-permission/addPermissionToUser',
    },
    getAllOrder: '/v2/order/all',
    getAllOrderStatistic: '/v2/order/statistica',
    tariff: {
      getAll: '/v2/tariff-category/all',
      getOne: '/v2/tariff-category/',
      delete: '/v2/tariff-category/delete/',
      create: '/v2/tariff-category/create/',
      update: '/v2/tariff-category/update/',
    },
    category: {
      getAll: '/tariff-category/category-all',
    },
    tariffPer: {
      add: '/v2/category/permission/create',
    },
    // projects
    project: {
      getAll: '/v2/agent-projects/get-all',
      getOne: '/v2/agent-projects/get-one',
      create: '/v2/agent-projects/create',
      edit: '/v2/agent-projects/update/',
      delete: '/v2/agent-projects/delete/',
    },
    // permission
    getAllPermission: ``,
    // user-roles
    createAgentRoles: '/v2/agent-roles/create',
    updateAgentRoles: '/v2/agent-roles',
    getOneAgentRoles: '/v2/agent-roles/get-one',
    deleteAgentRoles: '/v2/agent-roles/delete',
  },
  // user: {
  //   getAll: '/v2/users/get-all',
  //   createUser: '/v2/users/create',
  //   delete: '/v2/users/delete-user/',
  //   getOne: '/v2/users/get/',
  //   edit: '/v2/users/update-user/',
  // },
  // tariff: {
  //   create: '/v2/tariff/create',
  //   getAll: '/v2/tariff/get-all',
  //   edit: '/v2/tariff/update/',
  //   disable: '/v2/tariff/disable/',
  //   enable: '/v2/tariff/enable/',
  // },
  // carType: {
  //   create: '/v2/car-type/create',
  //   getAll: '/v2/car-type',
  //   edit: '/v2/car-type/',
  //   getOne: '/v2/car-type/',
  //   delete: '/v2/car-type/',
  // },
  // driver: {
  //   create: '/v2/driver/create',
  //   getAll: '/v2/driver/get-all',
  //   edit: '/v2/driver/update/',
  //   getOne: '/v2/driver/get-one/',
  //   delete: '/v2/driver/delete/',
  // },
  // car: {
  //   createPrice: '/v2/car/create/price',
  //   setImage: '/v2/car/set/image',
  //   create: '/v2/car/create',
  //   getAll: '/v2/car/get-all',
  //   edit: '/v2/car/update/',
  //   getOne: '/v2/car/get-one/',
  //   delete: '/v2/acr/delete/',
  // },
  // carModel: {
  //   setImage: '/v2/car-model/set-image',
  //   create: '/v2/car-model',
  //   update: '/v2/car-model/',
  //   all: '/v2/car-model',
  //   getOne: '/v2/car-model/',
  //   delete: '/v2/car-model/',
  //   changeImage: '/v2/car-model/image/',
  // },
  // statistic: {
  //   getAll: '/v2/order/get-all',
  // },
  roles: {
    create: '/v2/role/create',
    getAll: '/v2/role/get-all',
    getOne: '/v2/role/get-one/',
    edit: '/v2/role/update/',
    delete: '/v2/role/delete/',
  },
  agentPermission: {
    create: '/v2/permission/create',
    getAll: '/v2/permission/get-all',
    getOne: '/v2/permission/get-one/',
    edit: '/v2/permission/update/',
    delete: '/v2/permission/delete/',
  },
  // userPermissions: {
  //   create: '/v2/agent-permission/create',
  //   getAll: '/v2/agent-permission/all',
  //   getOne: '/v2/agent-permission/',
  //   edit: '/v2/agent-permission/update/',
  //   delete: '/v2/agent-permission/delete/',
  // },
  // userRoles: {
  //   create: '/v2/agent-roles/create',
  //   getAll: '/v2/agent-roles/get-all',
  //   getOne: '/v2/agent-roles/get-one/',
  //   getExist: '/v2/agent-roles/get-exist/',
  //   edit: '/v2/agent-roles/update/',
  //   delete: '/v2/agent-roles/delete/',
  // },
  // letsTripTour: {
  //   getAll: '/v2/products/tours',
  //   getOne: '/v2/products/tour',
  //   create: '/v2/products/tour',
  //   delete: '/v2/products/tour',
  // },
  // letsTripTransfer: {
  //   getAll: '/v2/products/transfers',
  //   create: '/v2/products/transfers',
  // },
  // category: {
  //   getAll: 'category/get-all',
  // },
} as const;
