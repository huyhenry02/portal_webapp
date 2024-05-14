import { createSlice } from '@reduxjs/toolkit';
import {
  IInfoPersonal,
  IMasterData,
  IWorkingHistory,
} from '../types/createProfile';
import { IEmployees } from '../types';
import { get } from 'lodash';

type IInitialState = {
  infoPersonal: IInfoPersonal;
  workingHistories: IWorkingHistory[];
  isLoading: boolean;
  isError: boolean;
  errors: { [key: string]: string[] };
  message: string;
  nationalities: IMasterData[];
  religions: IMasterData[];
  positions: IMasterData[];
  managers: IEmployees[];
  contractTypes: IMasterData[];
  employmentTypes: IMasterData[];
  insuranceResolveTypes: IMasterData[];
  deviceSupports: IMasterData[];
  salaryTypes: IMasterData[];
  cities: IMasterData[];
  jobsTitle: IMasterData[];
  employeeCreatedId: string;
};

const initialState: IInitialState = {
  infoPersonal: {},
  workingHistories: [],
  isLoading: false,
  isError: false,
  errors: {},
  message: '',
  nationalities: [],
  religions: [],
  positions: [],
  managers: [],
  contractTypes: [],
  employmentTypes: [],
  insuranceResolveTypes: [],
  deviceSupports: [],
  salaryTypes: [],
  cities: [],
  jobsTitle: [],
  employeeCreatedId: '',
};

const requestPending = (state: IInitialState) => {
  state.isLoading = true;
  state.isError = false;
  state.message = '';
  state.errors = {};
};

const requestError = (
  state: IInitialState,
  action: {
    type: string;
    payload: { message: string; errors: { [key: string]: string[] } };
  },
) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload.message;
  state.errors = action.payload.errors;
};

const getListDirectManagersPending = requestPending;
const getListDirectManagersError = requestError;
const getMasterDataPending = requestPending;
const getMasterDataError = requestError;
const createEmployeeProfilePending = requestPending;
const createEmployeeProfileError = requestError;

const getListDirectManagersSuccess = (
  state: IInitialState,
  action: { type: string; payload: { managers: IEmployees[] } },
) => {
  state.isLoading = false;
  state.managers = action.payload.managers;
  state.isError = false;
  state.message = '';
};

const getMasterDataSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: {
      allowance: IMasterData[];
      city: IMasterData[];
      contract_type: IMasterData[];
      employment: IMasterData[];
      insurance_policy: IMasterData[];
      nationality: IMasterData[];
      position: IMasterData[];
      religion: IMasterData[];
      salary_type: IMasterData[];
      title: IMasterData[];
    };
  },
) => {
  state.isLoading = false;
  state.deviceSupports = action.payload.allowance;
  state.contractTypes = action.payload.contract_type;
  state.employmentTypes = action.payload.employment;
  state.insuranceResolveTypes = action.payload.insurance_policy;
  state.nationalities = action.payload.nationality;
  state.positions = action.payload.position;
  state.religions = action.payload.religion;
  state.salaryTypes = action.payload.salary_type;
  state.jobsTitle = action.payload.title;
  state.cities = action.payload.city;
  state.isError = false;
  state.message = '';
};

const createEmployeeProfileSuccess = (
  state: IInitialState,
  action: { type: string; payload: { employee_id: string } },
) => {
  state.isLoading = false;
  state.isError = false;
  state.employeeCreatedId = get(action, 'payload.employee_id', '');
  state.message = '';
};

const createProfileSlice = createSlice({
  name: 'create-profile',
  initialState,
  reducers: {
    getListDirectManagersPending,
    getListDirectManagersError,
    getListDirectManagersSuccess,
    getMasterDataPending,
    getMasterDataError,
    getMasterDataSuccess,
    createEmployeeProfilePending,
    createEmployeeProfileError,
    createEmployeeProfileSuccess,
  },
});

export default createProfileSlice.reducer;

export const createProfileAction = createProfileSlice.actions;
