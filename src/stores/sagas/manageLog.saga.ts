import { put, takeEvery, call } from 'redux-saga/effects';
import { get } from 'lodash';
import { manageLogActions } from '../slices/manageLog.slice';
import axiosInstance from '../../services/axios.service';
import { toast } from 'react-toastify';

const fetchGetLog = async (payload: { key?: string; id: string }) => {
  return axiosInstance.get(`${process.env.REACT_APP_URL_API}/api/log/get`, {
    params: {
      key: payload.key,
      id: payload.id,
    },
  });
};
const handleGetLog = function* (action) {
  try {
    yield put({
      type: manageLogActions.getLogPending.type,
    });

    const response = yield call(fetchGetLog, action.payload);
    yield put({
      type: manageLogActions.getLogSuccess.type,
      payload: {
        logs: response?.data?.data,
      },
    });
  } catch (e) {
    yield put({
      type: manageLogActions.getLogError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const manageLogSaga = function* () {
  yield takeEvery(`${manageLogActions.getLogPending.type}_saga`, handleGetLog);
};
export default manageLogSaga;
