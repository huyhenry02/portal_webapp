import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  token: string;
  isLoading: boolean;
  isError: boolean;
  message: string;
  statusCodeSendMail: number;
  statusCodeResetPass: number;
  permissions: {
    name: string;
    id: string;
    description: string;
    in_module: string;
  }[];
};

const initialState: IInitialState = {
  token: '',
  isLoading: false,
  isError: false,
  message: '',
  statusCodeSendMail: 0,
  statusCodeResetPass: 0,
  permissions: [],
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
const postLoginPending = requestPending;
const postLoginError = requestError;
const postLoginSuccess = (state: IInitialState, token) => {
  state.isLoading = false;
  if (token?.payload?.token?.data?.access_token) {
    state.token = token?.payload?.token?.data?.access_token;
  } else {
    state.token = '';
  }
  state.permissions = token?.payload?.token?.data?.permissions ?? [];
  sessionStorage.setItem('token', state.token);
  if (state.token) {
    state.isError = false;
    state.message = '';
    window.location.href = '/';
  } else {
    state.isError = true;
    state.message = token?.payload?.token?.message;
  }
};

const postLogoutPending = requestPending;
const postLogoutError = requestError;
const postLogoutSuccess = (state: IInitialState, response) => {
  state.isLoading = false;
  if (response?.payload?.data?.status == 200) {
    state.token = '';
    sessionStorage.clear();
    state.isError = false;
    state.message = '';
  } else {
    state.isError = true;
    state.message = response?.payload?.data?.message;
  }
  window.location.href = '/';
};
const postSendEmailPending = requestPending;
const postSendEmailError = requestError;
const postSendEmailSuccess = (state: IInitialState, response) => {
  state.isLoading = false;
  state.isError = false;
  state.message = response?.payload?.data?.message;
  state.statusCodeSendMail = parseInt(response?.payload?.data?.statusCode);
};
const postResetPasswordPending = requestPending;
const postResetPasswordError = requestError;
const postResetPasswordSuccess = (state: IInitialState, response) => {
  state.isLoading = false;
  state.isError = false;
  state.message = response?.payload?.data?.message;
  state.statusCodeResetPass = parseInt(response?.payload?.data?.status);
};
const updateStatusCode = (state: IInitialState) => {
  state.statusCodeSendMail = 0;
  state.statusCodeResetPass = 0;
};
const authenticateSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    postLoginPending,
    postLoginSuccess,
    postLoginError,
    postLogoutPending,
    postLogoutSuccess,
    postLogoutError,
    postSendEmailPending,
    postSendEmailError,
    postSendEmailSuccess,
    postResetPasswordPending,
    postResetPasswordError,
    postResetPasswordSuccess,
    updateStatusCode,
  },
});

export default authenticateSlice.reducer;
export const authenticateActions = authenticateSlice.actions;
