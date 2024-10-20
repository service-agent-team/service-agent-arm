import { appActions } from '../app/slice';
import * as AuthActions from '../global/auth/actions';
import { AuthSliceActions } from '../global/auth/slice';
import * as PermissionActions from '../global/permission/actions';
import { PermissionSliceActions } from '../global/permission/slice';
import * as ProjectActions from '../global/project/actions';
import { ProjectSliceActions } from '../global/project/slice';
import * as RoleActions from '../global/role/actions';
import { RoleSliceActions } from '../global/role/slice';
import * as UserPermissionActions from '../global/user-permission/actions';
import { UserPermissionSliceActions } from '../global/user-permission/slice';
import * as UserRoleActions from '../global/user-role/actions';
import { UserRoleSliceActions } from '../global/user-role/slice';
import * as UserActions from '../global/users/actions';
import { UserSliceActions } from '../global/users/slice';

import * as LetsTripCategoryReduce from '../lets-trip/category/actions';
import { LetsTripCategorySliceActions } from '../lets-trip/category/slice';
import * as LetsTripCountryReduce from '../lets-trip/country/actions';
import { LetsTripCountrySliceActions } from '../lets-trip/country/slice';
import * as LetsTripGlobalCountryReduce from '../lets-trip/global-country/actions';
import { LetsTripGlobalCountrySliceActions } from '../lets-trip/global-country/slice';
import * as LetsTripGlobalRegionReduce from '../lets-trip/global-region/actions';
import { LetsTripGlobalRegionSliceActions } from '../lets-trip/global-region/slice';
import * as LetsTripGroupTourActions from '../lets-trip/group-tour/actions';
import { LetsTripGroupTourSliceActions } from '../lets-trip/group-tour/slice';
import * as LetsTripIndividualTourActions from '../lets-trip/individual-tour/actions';
import { LetsTripIndividualTourSliceActions } from '../lets-trip/individual-tour/slice';
import * as LetsTripOrderActions from '../lets-trip/order/actions';
import { LetsTripOrderSliceActions } from '../lets-trip/order/slice';
import * as LetsTripStatisticReduce from '../lets-trip/statistic/actions';
import { LetsTripStatisticSliceActions } from '../lets-trip/statistic/slice';
import * as LetsTripTransferCategoryReduce from '../lets-trip/transfer-category/actions';
import { LetsTripTransferCategorySliceActions } from '../lets-trip/transfer-category/slice';
import * as LetsTripTransferReduce from '../lets-trip/transfer/actions';
import { LetsTripTransferSliceActions } from '../lets-trip/transfer/slice';
import * as LetsTripFeedbackReduce from '../lets-trip/feedback/actions';
import { LetsTripFeedbackSliceActions } from '../lets-trip/feedback/slice';

import * as AgentPermissionsSliceActions from '../service-agent/agent-permission/action';
import { AgentPermissionsActions } from '../service-agent/agent-permission/slice';
import * as CompanyAction from '../service-agent/company/actions';
import { CompanySliceActions } from '../service-agent/company/slice';
import * as ContractSlices from '../service-agent/contract/contract.action';
import { ContractSliceActions } from '../service-agent/contract/contract.slice';
import * as AgentOrdersActions from '../service-agent/order/actions';
import { AgentOrderSliceActions } from '../service-agent/order/slices';
import * as AgentPermissionActions from '../service-agent/permission/action';
import { AgentPermissionSliceActions } from '../service-agent/permission/slice';
import * as ProductActions from '../service-agent/product/action';
import { ProductSliceActions } from '../service-agent/product/slice';
import * as AgentProjectActions from '../service-agent/project/actions';
import { AgentProjectSliceActions } from '../service-agent/project/slice';
import * as AgentRolesPermissionActions from '../service-agent/role-permission/actions';
import { AgentRolesPermissionSliceActions } from '../service-agent/role-permission/slice';
import * as RolesSlice from '../service-agent/roles/action';
import { RolesSliceActions } from '../service-agent/roles/slice';
import * as AgentStatisticActions from '../service-agent/statistic/actions';
import { AgentStatisticSliceActions } from '../service-agent/statistic/slice';
import * as AgentTariffActions from '../service-agent/tariff/tariff.action';
import * as TariffActions from '../service-agent/tariff/tariff.action';
import { AgentTariffSliceActions } from '../service-agent/tariff/tariff.slice';
import * as AgentUserPermissionActions from '../service-agent/user-permission/action';
import { AgentUserPermissionSliceActions } from '../service-agent/user-permission/slice';
import * as AgentUserRoleActions from '../service-agent/user-role/action';
import { AgentUserRoleSliceActions } from '../service-agent/user-role/slice';

import * as BookingBedTypeReduce from '../booking/bed-type/actions';
import { BookingBedTypeSliceActions } from '../booking/bed-type/slice';
import * as BookingBreakfastActions from '../booking/breakfast/action';
import { breakfastSliceActions } from '../booking/breakfast/slice';
import * as BookingFacilityCategoryReduce from '../booking/facility-category/actions';
import { BookingFacilityCategorySliceActions } from '../booking/facility-category/slice';
import * as BookingFacilityReduce from '../booking/facility/actions';
import { BookingFacilitySliceActions } from '../booking/facility/slice';
import * as BookingTaxesReduce from '../booking/taxes/actions';
import { BookingTaxesSliceActions } from '../booking/taxes/slice';
import * as BookingRoomReduce from '../booking/room/actions';
import { BookingRoomSliceActions } from '../booking/room/slice';
import * as BookingPropertyReduce from '../booking/property/actions';
import { BookingPropertySliceActions } from '../booking/property/slice';

import * as LetstripUsers from '../lets-trip/notification/actions';
import { LetsTripNotificationSliceActions } from '../lets-trip/notification/slice';

import * as ProcessProjectReduce from '../process/project/actions';
import { ProcessProjectSliceActions } from '../process/project/slice';
import * as ProcessReduce from '../process/diagram/actions';
import { ProcessSliceActions } from '../process/diagram/slice';

export const AllActions = {
  ...AgentTariffActions,
  ...AgentTariffSliceActions,
  ...ContractSlices,
  ...ContractSliceActions,
  ...appActions,
  ...AuthSliceActions,
  ...AuthActions,
  ...UserSliceActions,
  ...UserActions,
  ...UserActions,
  ...PermissionActions,
  ...PermissionSliceActions,
  ...RoleActions,
  ...RoleSliceActions,
  ...UserRoleActions,
  ...UserRoleSliceActions,
  ...TariffActions,
  ...ProductActions,
  ...ProductSliceActions,
  ...RolesSlice,
  ...RolesSliceActions,
  ...UserPermissionSliceActions,
  ...UserPermissionActions,
  ...CompanySliceActions,
  ...CompanyAction,
  ...AgentRolesPermissionSliceActions,
  ...AgentRolesPermissionActions,
  ...AgentPermissionSliceActions,
  ...AgentPermissionsSliceActions,
  ...AgentPermissionActions,
  ...AgentPermissionsActions,
  ...AgentOrderSliceActions,
  ...AgentOrdersActions,
  ...AgentStatisticSliceActions,
  ...AgentStatisticActions,
  ...AgentUserRoleSliceActions,
  ...AgentUserRoleActions,
  ...LetsTripOrderSliceActions,
  ...LetsTripOrderActions,
  ...AgentUserPermissionActions,
  ...AgentUserPermissionSliceActions,
  ...ProjectSliceActions,
  ...ProjectActions,
  ...AgentProjectActions,
  ...AgentProjectSliceActions,

  ...LetsTripGroupTourActions,
  ...LetsTripGroupTourSliceActions,
  ...LetsTripIndividualTourActions,
  ...LetsTripIndividualTourSliceActions,
  ...LetsTripTransferReduce,
  ...LetsTripTransferSliceActions,
  ...LetsTripTransferCategoryReduce,
  ...LetsTripTransferCategorySliceActions,
  ...LetsTripCountryReduce,
  ...LetsTripCountrySliceActions,
  ...LetsTripGlobalCountryReduce,
  ...LetsTripGlobalCountrySliceActions,
  ...LetsTripCategoryReduce,
  ...LetsTripCategorySliceActions,
  ...LetsTripStatisticReduce,
  ...LetsTripStatisticSliceActions,
  ...LetsTripGlobalRegionReduce,
  ...LetsTripGlobalRegionSliceActions,
  ...LetstripUsers,
  ...LetsTripNotificationSliceActions,
  ...LetsTripFeedbackReduce,
  ...LetsTripFeedbackSliceActions,

  ...BookingFacilityReduce,
  ...BookingFacilitySliceActions,
  ...BookingBreakfastActions,
  ...breakfastSliceActions,
  ...BookingFacilityCategoryReduce,
  ...BookingFacilityCategorySliceActions,
  ...BookingBedTypeReduce,
  ...BookingBedTypeSliceActions,
  ...BookingTaxesReduce,
  ...BookingTaxesSliceActions,
  ...BookingRoomReduce,
  ...BookingRoomSliceActions,
  ...BookingPropertyReduce,
  ...BookingPropertySliceActions,

  ...ProcessProjectReduce,
  ...ProcessProjectSliceActions,
  ...ProcessReduce,
  ...ProcessSliceActions,
};
