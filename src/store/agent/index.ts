export * as AgentContractActions from './contract/contract.action';
export { AgentContractReducer, ContractSliceActions } from './contract/contract.slice';

export { AgentPermissionReducer, AgentPermissionSliceActions } from './permission/slice';
export * as AgentTariffAction from './tariff/tariff.action';

// export {
//   agentTariffPermissionReducer,
//   agentTariffPermissionSliceActions,
// } from './tariffPermission/permission.slice';
// export * as TariffPermissionAction from './tariffPermission/permission.action';
export { AgentTariffReducer, AgentTariffSliceActions } from './tariff/tariff.slice';
