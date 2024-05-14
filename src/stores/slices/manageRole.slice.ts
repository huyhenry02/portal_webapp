import { createSlice } from '@reduxjs/toolkit';
import { map } from 'lodash';
import moment from 'moment/moment';
import { FORMAT_YYYY_MM_DD } from '../../constants/constant';
import { IListPermissions, IListPermissionsResponseCommon } from '../types';
export type IRole = {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
};
export type IRolesResponse = {
  id: string;
  name: string;
  status: string;
  created_at: string;
  description: string;
};
export type IPaginateResponse = {
  count: number;
  current_page: number;
  per_page: number;
  total_page: number;
  total: number;
};

type IInitialState = {
  roles: IRole[];
  paginate: IPaginateResponse;
  permissionsOfRoleModule: IListPermissions;
  isLoading: boolean;
  isError: boolean;
  message: string;
  deleteStatus: boolean;
  createOrUpdateStatus: boolean;
};

const initialState: IInitialState = {
  roles: [],
  paginate: {
    count: 0,
    current_page: 0,
    per_page: 0,
    total_page: 0,
    total: 0,
  },
  permissionsOfRoleModule: [],
  isLoading: false,
  isError: false,
  message: '',
  deleteStatus: false,
  createOrUpdateStatus: false,
};

const requestPending = (state: IInitialState) => {
  state.isLoading = true;
  state.isError = false;
  state.message = '';
};

const requestError = (
  state: IInitialState,
  action: { type: string; payload: { message: string } },
) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload.message;
};

const getListRolePending = requestPending;

const getListRoleSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { roles: IRolesResponse[]; meta: IPaginateResponse };
  },
) => {
  state.paginate = {
    count: action.payload.meta.count ?? 0,
    current_page: action.payload.meta.current_page ?? 0,
    per_page: action.payload.meta.per_page ?? 0,
    total_page: action.payload.meta.total_page ?? 0,
    total: action.payload.meta.total ?? 0,
  };
  state.isLoading = false;
  state.roles = map(
    action.payload.roles,
    role =>
      ({
        id: role.id,
        name: role.name,
        description: role.description,
        status: role.status,
        createdAt: moment(role.created_at).format(FORMAT_YYYY_MM_DD),
      }) as IRole,
  );
  state.isError = false;
  state.message = '';
};

const getListRoleError = requestError;

const getRoleDetailPending = requestPending;

const getRoleDetailSuccess = (
  state: IInitialState,
  action: { type: string; payload: { roles: IRolesResponse[] } },
) => {
  state.isLoading = false;
  state.roles = map(
    action.payload.roles,
    role =>
      ({
        id: role.id,
        name: role.name,
        status: role.status,
        createdAt: moment(role.created_at).format(FORMAT_YYYY_MM_DD),
      }) as IRole,
  );
  state.isError = false;
  state.message = '';
};

const getRoleDetailError = requestError;

const getListPermissionOfRolePending = requestPending;
const getListPermissionOfRoleSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { permissions: IListPermissionsResponseCommon };
  },
) => {
  const { permissions } = action.payload;
  state.permissionsOfRoleModule = map(permissions, permission => {
    const { description, name, permissions } = permission;
    return {
      description,
      name,
      permissions: map(permissions, item => ({
        id: item.id,
        name: item.name,
        enable: item.in_role,
        description: item.description,
      })),
    };
  });
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};
const getListPermissionOfRoleError = requestError;

const createOrUpdateRolePermissionsPending = requestPending;
const createOrUpdateRolePermissionsSuccess = (state: IInitialState) => {
  state.isLoading = false;
  state.isError = false;
  state.message = '';
  state.createOrUpdateStatus = true;
};
const createOrUpdateRolePermissionsError = requestError;

const deleteRolePending = requestPending;

const deleteRoleSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { deleteResponse: { statusCode: number } };
  },
) => {
  const dataStatus = action.payload?.deleteResponse?.statusCode ?? 0;
  if (dataStatus === 200) {
    state.deleteStatus = true;
  }
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};

const deleteRoleError = requestError;

const updateDeleteStatusStage = (state: IInitialState) => {
  state.deleteStatus = !state.deleteStatus;
};
const updateCreateOrUpdateStatusStage = (state: IInitialState) => {
  state.createOrUpdateStatus = !state.createOrUpdateStatus;
};

const manageRoleSlice = createSlice({
  name: 'manage-role',
  initialState,
  reducers: {
    getListRolePending,
    getListRoleSuccess,
    getListRoleError,
    getRoleDetailPending,
    getRoleDetailSuccess,
    getRoleDetailError,
    getListPermissionOfRolePending,
    getListPermissionOfRoleSuccess,
    getListPermissionOfRoleError,
    createOrUpdateRolePermissionsPending,
    createOrUpdateRolePermissionsSuccess,
    createOrUpdateRolePermissionsError,
    deleteRolePending,
    deleteRoleSuccess,
    deleteRoleError,
    updateDeleteStatusStage,
    updateCreateOrUpdateStatusStage,
  },
});

export default manageRoleSlice.reducer;
export const manageRoleActions = manageRoleSlice.actions;
