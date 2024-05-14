import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { FORMAT_HH_MM_SS_DD_MM_YY } from '../../constants/constant';
import { ILog } from '../types/manageLog';

type IInitialState = {
  logs: ILog[];
  isLoading: boolean;
  isError: boolean;
  message: string;
};

const initialState: IInitialState = {
  logs: [],
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
const getLogPending = requestPending;
const getLogError = requestError;

const getLogSuccess = (
  state: IInitialState,
  action: { type: string; payload: { logs: ILog[] } },
) => {
  state.logs = action.payload.logs.map(log => ({
    ...log,
    created_at: moment(log.created_at).format(FORMAT_HH_MM_SS_DD_MM_YY),
  }));
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};
const manageLogSlice = createSlice({
  name: 'manage-log',
  initialState,
  reducers: {
    getLogPending,
    getLogSuccess,
    getLogError,
  },
});

export default manageLogSlice.reducer;
export const manageLogActions = manageLogSlice.actions;
