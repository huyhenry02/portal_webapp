import { createSlice } from '@reduxjs/toolkit';
import { map } from 'lodash';
import moment from 'moment';
import { FORMAT_YYYY_MM_DD } from '../../constants/constant';
import { IAppointment, IAppointmentDetail } from '../types/manageAppointment';
import { IPaginateResponse } from './manageRole.slice';

type IInitialState = {
  appointments: IAppointment[];
  paginate: IPaginateResponse;
  appointmentDetail?: IAppointmentDetail;
  isLoading: boolean;
  isError: boolean;
  message: string;
};

const initialState: IInitialState = {
  appointments: [],
  paginate: {
    count: 0,
    current_page: 0,
    per_page: 0,
    total_page: 0,
    total: 0,
  },
  appointmentDetail: undefined,
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
const getListAppointmentPending = requestPending;
const getListAppointmentError = requestError;

const getListAppointmentSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { appointments: IAppointment[]; meta: IPaginateResponse };
  },
) => {
  state.isLoading = false;
  state.appointments = map(action.payload.appointments, appointment => ({
    id: appointment.id,
    name: appointment.name,
    email: appointment.email,
    status: appointment.status,
    start_time: appointment.start_time,
    end_time: appointment.end_time,
    create_at: moment(appointment.create_at).format(FORMAT_YYYY_MM_DD),
  }));
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

const getAppointmentDetailPending = requestPending;
const getAppointmentDetailError = requestError;
const getAppointmentDetailSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { appointmentDetail: IAppointmentDetail };
  },
) => {
  const { appointmentDetail } = action.payload;
  state.appointmentDetail = {
    id: appointmentDetail.id,
    name: appointmentDetail.name,
    email: appointmentDetail.email,
    phone: appointmentDetail.phone,
    identification: appointmentDetail.identification,
    reason: appointmentDetail.reason,
    reject_reason: appointmentDetail.reject_reason,
    status: appointmentDetail.status,
    start_time: appointmentDetail.start_time,
    end_time: appointmentDetail.end_time,
    create_at: moment(appointmentDetail.create_at).format(FORMAT_YYYY_MM_DD),
  };
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};
const updateStatusAppointmentPending = requestPending;
const updateStatusAppointmentError = requestError;

const updateStatusAppointmentSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { appointmentDetail: IAppointmentDetail };
  },
) => {
  if (state.appointmentDetail) {
    state.appointmentDetail = action.payload.appointmentDetail;
  }
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};

const manageAppointmentSlice = createSlice({
  name: 'manage-appointment',
  initialState,
  reducers: {
    getListAppointmentPending,
    getListAppointmentSuccess,
    getListAppointmentError,
    getAppointmentDetailPending,
    getAppointmentDetailError,
    getAppointmentDetailSuccess,
    updateStatusAppointmentPending,
    updateStatusAppointmentError,
    updateStatusAppointmentSuccess,
  },
});

export default manageAppointmentSlice.reducer;
export const manageAppointmentActions = manageAppointmentSlice.actions;
