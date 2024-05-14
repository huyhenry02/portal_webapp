import { createSlice } from '@reduxjs/toolkit';
import { IUserInfo } from '../types/manageUser';
type IInitialState = {
  userInfo: IUserInfo;
  isLoading: boolean;
  isError: boolean;
  message: string;
};
const initialState: IInitialState = {
  userInfo: {
    code: '',
    username: '',
    name: '',
    email: '',
    role: '',
    phone_number: '',
    avatar: [],
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
const getUserInfoPending = requestPending;
const getUserInfoError = requestError;
const getUserInfoSuccess = (
  state: IInitialState,
  action: { type: string; payload: { userInfo: IUserInfo } },
) => {
  const { userInfo } = action.payload;
  state.userInfo = {
    code: userInfo.code,
    username: userInfo.username,
    name: userInfo.name,
    email: userInfo.email,
    role: userInfo.role,
    phone_number: userInfo.phone_number,
    avatar: userInfo.avatar,
  };
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};
const changePassUserPending = requestPending;
const changePassUserError = requestError;
const changePassUserSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { userInfo: IUserInfo };
  },
) => {
  if (state.userInfo) {
    state.userInfo = action.payload.userInfo;
  }
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};

const manageUserSlice = createSlice({
  name: 'manage-user',
  initialState,
  reducers: {
    getUserInfoPending,
    getUserInfoError,
    getUserInfoSuccess,
    changePassUserError,
    changePassUserPending,
    changePassUserSuccess,
  },
});

export default manageUserSlice.reducer;
export const manageUserActions = manageUserSlice.actions;
