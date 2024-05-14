import axiosInstance from '../../services/axios.service';
import { call, put, takeEvery } from 'redux-saga/effects';
import { manageUserActions } from '../slices/manageUser.slice';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { translate } from '../../translates/translate';

const fetchGetUserInfo = async () => {
  return axiosInstance.get(`/api/auth/get-user-info`);
};
const fetchChangePassUser = async payload => {
  return axiosInstance.put(`/api/auth/change-pass`, payload);
};

const handleGetUserInfo = function* () {
  try {
    yield put({
      type: manageUserActions.getUserInfoPending.type,
    });
    const response = yield call(fetchGetUserInfo);
    yield put({
      type: manageUserActions.getUserInfoSuccess.type,
      payload: { userInfo: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageUserActions.getUserInfoError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const handleChangePassUser = function* (action) {
  try {
    yield put({
      type: manageUserActions.changePassUserPending.type,
    });
    const response = yield call(fetchChangePassUser, action.payload);
    yield put({
      type: manageUserActions.changePassUserSuccess.type,
      payload: { userInfo: response?.data?.data },
    });
    toast.success(translate('CHANGE_PASSWORD_SUCCESS'));
  } catch (e) {
    yield put({
      type: manageUserActions.changePassUserError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const manageUserSaga = function* () {
  yield takeEvery(
    `${manageUserActions.getUserInfoPending.type}_saga`,
    handleGetUserInfo,
  );
  yield takeEvery(
    `${manageUserActions.changePassUserPending.type}_saga`,
    handleChangePassUser,
  );
};
export default manageUserSaga;
