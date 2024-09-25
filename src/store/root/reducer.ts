import { appReducer } from '../app';
import { AuthReducer } from '../global/auth/slice';
import { PermissionReducer } from '../global/permission/slice';
import { ProjectReducer } from '../global/project/slice';
import { RoleReducer } from '../global/role/slice';
import { UserRoleReducer } from '../global/user-role/slice';
import { UserReducer } from '../global/users/slice';
import { CarModelReducer } from '../lets-trip/car-model/slice';
import { CarTypeReducer } from '../lets-trip/car-type/slice';
import { CarReducer } from '../lets-trip/car/slice';
import { LetsTripOrderReduce } from '../lets-trip/order/slice';
import { CompanyReducer } from '../service-agent/company/slice';
import { AgentContractReducer } from '../service-agent/contract/contract.slice';
import { AgentOrderReducer } from '../service-agent/order/slices';
import { AgentPermissionReducer } from '../service-agent/permission/slice';
import { ProductReducer } from '../service-agent/product/slice';
import { AgentProjectReducer } from '../service-agent/project/slice';
import { AgentRolesPermissionReducer } from '../service-agent/role-permission/slice';
import { RolesReducer } from '../service-agent/roles/slice';
import { AgentStatisticReducer } from '../service-agent/statistic/slice';
import { AgentTariffReducer } from '../service-agent/tariff/tariff.slice';
import { AgentUserPermissionReducer } from '../service-agent/user-permission/slice';
import { AgentUserRoleReducer } from '../service-agent/user-role/slice';

import { UserPermissionReducer } from '../global/user-permission/slice';
import { LetsTripCategoryReduce } from '../lets-trip/category/slice';
import { LetsTripCountryReduce } from '../lets-trip/country/slice';
import { LetsTripGlobalCountryReduce } from '../lets-trip/global-country/slice';
import { LetsTripGlobalRegionReduce } from '../lets-trip/global-region/slice';
import { LetsTripGroupTourReduce } from '../lets-trip/group-tour/slice';
import { LetsTripIndividualTourReduce } from '../lets-trip/individual-tour/slice';
import { LetsTripStatisticReduce } from '../lets-trip/statistic/slice';
import { LetsTripTransferCategoryReduce } from '../lets-trip/transfer-category/slice';
import { LetsTripTransferReduce } from '../lets-trip/transfer/slice';
import { AgentPermissionsReducer } from '../service-agent/agent-permission/slice';

import { BookingBedTypeReduce } from '../booking/bed-type/slice';
import { breakfastReducer } from '../booking/breakfast/slice';
import { BookingFacilityCategoryReduce } from '../booking/facility-category/slice';
import { BookingFacilityReduce } from '../booking/facility/slice';
import { BookingTaxesReduce } from '../booking/taxes/slice';
import { BookingRoomReduce } from '../booking/room/slice';

import { LetsTripNotificationReduce } from '../lets-trip/notification/slice';
import { BookingPropertyReduce } from '../booking/property/slice';

export const reducer = {
  app: appReducer,
  auth: AuthReducer,

  user: UserReducer,
  users: UserReducer,
  agent: AgentContractReducer,
  permission: PermissionReducer,
  company: CompanyReducer,
  product: ProductReducer,
  project: ProjectReducer,
  role: RoleReducer,
  userRole: UserRoleReducer,
  userPermission: UserPermissionReducer,
  carType: CarTypeReducer,
  agentTariff: AgentTariffReducer,
  car: CarReducer,
  carModel: CarModelReducer,
  roles: RolesReducer,

  agentRolesPermission: AgentRolesPermissionReducer,
  agentPermission: AgentPermissionReducer,
  agentPermissions: AgentPermissionsReducer,
  agentOrder: AgentOrderReducer,
  agentStatistic: AgentStatisticReducer,
  agentUserRole: AgentUserRoleReducer,
  agentUserPermission: AgentUserPermissionReducer,
  agentProject: AgentProjectReducer,

  letsTripOrder: LetsTripOrderReduce,
  letsTripTour: LetsTripGroupTourReduce,
  letsTripIndividualTour: LetsTripIndividualTourReduce,
  letsTripTransfer: LetsTripTransferReduce,
  letsTripTransferCategory: LetsTripTransferCategoryReduce,
  letsTripCountry: LetsTripCountryReduce,
  letsTripGlobalCountry: LetsTripGlobalCountryReduce,
  letsTripCategory: LetsTripCategoryReduce,
  letsTripStatistic: LetsTripStatisticReduce,
  letsTripGlobalRegion: LetsTripGlobalRegionReduce,

  bookingFacility: BookingFacilityReduce,
  bookingBreakfast: breakfastReducer,
  bookingFacilityCategory: BookingFacilityCategoryReduce,
  bookingBedType: BookingBedTypeReduce,
  bookingTaxes: BookingTaxesReduce,
  bookingRoom: BookingRoomReduce,
  bookingProperty: BookingPropertyReduce,

  letstripNotification: LetsTripNotificationReduce,
};
