import { put, takeEvery, call } from 'redux-saga/effects';
import { authenticateActions } from '../slices/authenticate.slice';
import { get } from 'lodash';
import axiosInstance from '../../services/axios.service';
import { toast } from 'react-toastify';
import { translate } from '../../translates/translate';

const fetchLogin = async (payload: { username: string; password: string }) => {
  const url = process.env.REACT_APP_URL_API + '/api/auth/login';
  const bodyFormData = new FormData();
  bodyFormData.append('username', payload.username);
  bodyFormData.append('password', payload.password);
  return axiosInstance.post(url, bodyFormData);
};
const fetchLogout = async () => {
  const url = process.env.REACT_APP_URL_API + '/api/auth/logout';
  const bodyFormData = new FormData();
  return axiosInstance.post(url, bodyFormData);
};
const fetchPostSendEmail = async (payload: { email: string }) => {
  const bodyFormData = new FormData();
  bodyFormData.append('email', payload.email);
  return axiosInstance.post(
    process.env.REACT_APP_URL_API + '/api/auth/send-reset-password-email',
    bodyFormData,
  );
};
const fetchPostResetPassword = async (payload: {
  token: string;
  new_password: string;
  password_confirm: string;
}) => {
  return axiosInstance.put(
    process.env.REACT_APP_URL_API + `/api/auth/reset-password`,
    {
      token: payload.token,
      new_password: payload.new_password,
      password_confirm: payload.password_confirm,
    },
  );
};

const handlePostLogin = function* (action) {
  try {
    yield put({
      type: authenticateActions.postLoginPending.type,
    });
    const response = yield call(fetchLogin, action.payload);
    yield put({
      type: authenticateActions.postLoginSuccess.type,
      payload: { token: response?.data },
    });
  } catch (e) {
    yield put({
      type: authenticateActions.postLoginError.type,
      payload: { message: get(e, 'message') },
    });
  }
};
const handlePostLogout = function* () {
  try {
    yield put({
      type: authenticateActions.postLogoutPending.type,
    });
    const response = yield call(fetchLogout);
    yield put({
      type: authenticateActions.postLogoutSuccess.type,
      payload: { data: response?.data },
    });
  } catch (e) {
    yield put({
      type: authenticateActions.postLogoutError.type,
      payload: { message: get(e, 'message') },
    });
  }
};
const handlePostSendEmail = function* (action) {
  try {
    yield put({
      type: authenticateActions.postSendEmailPending.type,
    });
    const response = yield call(fetchPostSendEmail, action.payload);
    yield put({
      type: authenticateActions.postSendEmailSuccess.type,
      payload: { data: response?.data },
    });
    toast.success(translate('SEND_EMAIL_SUCCESS'));
  } catch (e) {
    yield put({
      type: authenticateActions.postSendEmailError.type,
      payload: { message: get(e, 'message') },
    });
    const errorMessages = get(e, 'response.data.errors.email');
    if (errorMessages) {
      const errorMessage = errorMessages[0];
      toast.error(errorMessage);
    } else {
      toast.error(get(e, 'message'));
    }
  }
};
const handlePostResetPassword = function* (action) {
  try {
    yield put({
      type: authenticateActions.postResetPasswordPending.type,
    });
    const response = yield call(fetchPostResetPassword, action.payload);
    yield put({
      type: authenticateActions.postResetPasswordSuccess.type,
      payload: { data: response?.data },
    });
    toast.success(translate('CHANGE_PASSWORD_SUCCESS'));
  } catch (e) {
    yield put({
      type: authenticateActions.postResetPasswordError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const handleUpdateStatusSendMail = function* () {
  yield put({
    type: authenticateActions.updateStatusCode.type,
  });
};

const authenticateSaga = function* () {
  yield takeEvery(
    `${authenticateActions.postLoginPending.type}_saga`,
    handlePostLogin,
  );
  yield takeEvery(
    `${authenticateActions.postLogoutPending.type}_saga`,
    handlePostLogout,
  );
  yield takeEvery(
    `${authenticateActions.postSendEmailPending.type}_saga`,
    handlePostSendEmail,
  );
  yield takeEvery(
    `${authenticateActions.postResetPasswordPending.type}_saga`,
    handlePostResetPassword,
  );
  yield takeEvery(
    `${authenticateActions.updateStatusCode.type}_saga`,
    handleUpdateStatusSendMail,
  );
};

export default authenticateSaga;
