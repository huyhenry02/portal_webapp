import { createSlice } from '@reduxjs/toolkit';
import { map } from 'lodash';
import moment from 'moment';
import { FORMAT_YYYY_MM_DD } from '../../constants/constant';
import {
  IEmployeeDetail,
  IEmployeeDetailResponse,
  IEmployees,
  IListPermissions,
  IListPermissionsResponse,
  IProfile,
  IRoles,
} from '../types';
import { IPaginateResponse } from './manageRole.slice';

type IInitialState = {
  profiles: IProfile[];
  employeeDetail?: IEmployeeDetail;
  roles: IRoles[];
  permissionsOfRole: IListPermissions;
  paginate: IPaginateResponse;
  isLoading: boolean;
  isError: boolean;
  message: string;
};

const initialState: IInitialState = {
  profiles: [],
  employeeDetail: undefined,
  roles: [],
  permissionsOfRole: [],
  paginate: {
    count: 0,
    current_page: 0,
    per_page: 0,
    total_page: 0,
    total: 0,
  },
  isLoading: false,
  isError: false,
  message: '',
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

const getListEmployeePending = requestPending;

const getListEmployeeSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { profiles: IEmployees[]; meta: IPaginateResponse };
  },
) => {
  state.isLoading = false;
  state.profiles = map(
    action.payload.profiles,
    profile =>
      ({
        id: profile.id,
        fullName: profile.name,
        email: profile.email,
        position: profile.position,
        status: profile.status,
        createdProfileAt: profile.account_created_at
          ? moment(profile.account_created_at).format(FORMAT_YYYY_MM_DD)
          : '',
        createdAt: moment(profile.created_at).format(FORMAT_YYYY_MM_DD),
      }) as IProfile,
  );
  state.paginate = {
    count: action.payload.meta?.count ?? 0,
    current_page: action.payload.meta?.current_page ?? 0,
    per_page: action.payload.meta?.per_page ?? 0,
    total_page: action.payload.meta?.total_page ?? 0,
    total: action.payload.meta?.total ?? 0,
  };
  state.isError = false;
  state.message = '';
};

const getListEmployeeError = requestError;

const getEmployeeDetailPending = requestPending;

const getEmployeeDetailSuccess = (
  state: IInitialState,
  action: { type: string; payload: { employee: IEmployeeDetailResponse } },
) => {
  const { employee } = action.payload;
  state.employeeDetail = {
    username: employee.code,
    employeeCode: employee.code,
    fullName: employee.name,
    birthday: employee?.dob
      ? moment(employee.dob).format(FORMAT_YYYY_MM_DD)
      : '',
    company: 'TEST NEED PROVIDE',
    department: 'TEST NEED PROVIDE',
    email: employee.email,
    phoneNumber: employee.phone_number,
    homeTown: employee.address,
    createdAt: 'TEST NEED PROVIDE',
    nationality: employee.country,
    gender: employee.gender,
    isMarried: employee.marital,
    ethnic: employee.ethnic,
    identification: employee.identification,
    placeOfIssue: employee.place_of_issue,
    dateOfIssue: employee?.date_of_issue
      ? moment(employee.date_of_issue).format(FORMAT_YYYY_MM_DD)
      : '',
    identificationFront: map(employee.identification_front, file => ({
      id: file.uuid,
      path: file.original_url,
      lastModified: 1,
      lastModifiedDate: '',
      name: file.name,
      size: file.size,
      type: '',
      webkitRelativePath: '',
      originalURL: file.original_url,
    })),
    identificationBack: map(employee.identification_back, file => ({
      id: file.uuid,
      path: file.original_url,
      lastModified: 1,
      lastModifiedDate: '',
      name: file.name,
      size: file.size,
      type: '',
      webkitRelativePath: '',
      originalURL: file.original_url,
    })),
    faceImage: map(employee.face_image, file => ({
      id: file.uuid,
      path: file.original_url,
      lastModified: 1,
      lastModifiedDate: '',
      name: file.name,
      size: file.size,
      type: '',
      webkitRelativePath: '',
      originalURL: file.original_url,
    })),
    fingerprint: map(employee.fingerprint, file => ({
      id: file.uuid,
      path: file.original_url,
      lastModified: 1,
      lastModifiedDate: '',
      name: file.name,
      size: file.size,
      type: '',
      webkitRelativePath: '',
      originalURL: file.original_url,
    })),
    taxCode: employee.tax_code,
    onboardDate: employee.onboard_date
      ? moment(employee.onboard_date).format(FORMAT_YYYY_MM_DD)
      : '',
    directManager: employee.leader_id,
    subsidiary: employee.subsidiary_id,
    position: employee.position_id,
    address: employee.address,
    bankAccountNumber: employee.bank_account_number,
    bankAccountName: employee.bank_account_name,
    bankName: employee.bank_name,
    bankBranch: employee.bank_branch,
    workingHistories: employee?.working_histories
      ? employee.working_histories.map(wh => ({
          workStart: wh.start_date
            ? moment(wh.start_date).format(FORMAT_YYYY_MM_DD)
            : '',
          workEnd: wh.end_date
            ? moment(wh.end_date).format(FORMAT_YYYY_MM_DD)
            : '',
          workPosition: wh.position,
          workCompany: wh.company,
        }))
      : [],
  };
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};

const getEmployeeDetailError = requestError;

const getListRolePending = requestPending;

const getListRoleSuccess = (
  state: IInitialState,
  action: { type: string; payload: { roles: IRoles[] } },
) => {
  state.roles = action.payload.roles;
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};

const getListRoleError = requestError;

const getListPermissionOfRolePending = requestPending;
const getListPermissionOfRoleSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { permissions: IListPermissionsResponse };
  },
) => {
  const { permissions } = action.payload;
  state.permissionsOfRole = map(permissions, permission => {
    const { description, name, permissions } = permission;
    return {
      description,
      name,
      permissions: map(permissions, item => ({
        id: item.id,
        name: item.description,
        enable: item.in_role,
      })),
    };
  });
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};

const getListPermissionOfRoleError = requestError;

const createAccountPending = requestPending;
const createAccountSuccess = (state: IInitialState) => {
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};
const updateAccountPending = requestPending;
const updateAccountError = requestError;
const updateAccountSuccess = (state: IInitialState) => {
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};

const createAccountError = requestError;

const manageProfileSlice = createSlice({
  name: 'manage-profile',
  initialState,
  reducers: {
    getListEmployeePending,
    getListEmployeeSuccess,
    getListEmployeeError,
    getEmployeeDetailPending,
    getEmployeeDetailSuccess,
    getEmployeeDetailError,
    getListRolePending,
    getListRoleSuccess,
    getListRoleError,
    getListPermissionOfRolePending,
    getListPermissionOfRoleSuccess,
    getListPermissionOfRoleError,
    createAccountPending,
    createAccountSuccess,
    createAccountError,
    updateAccountError,
    updateAccountPending,
    updateAccountSuccess,
  },
});

export default manageProfileSlice.reducer;
export const manageProfileActions = manageProfileSlice.actions;
