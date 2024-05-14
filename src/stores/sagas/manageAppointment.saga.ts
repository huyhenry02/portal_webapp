import { put, takeEvery, call, takeLatest, delay } from 'redux-saga/effects';
import { manageAppointmentActions } from '../slices/manageAppointment.slice';
import { get } from 'lodash';
import axiosInstance from '../../services/axios.service';
import { toast } from 'react-toastify';
import { translate } from '../../translates/translate';

const fetchListAppointment = async (payload: {
  perPage: number;
  page: number;
  status?: number;
}) => {
  return axiosInstance.get(
    process.env.REACT_APP_URL_API + `/api/appointment/get/`,
    {
      params: {
        per_page: payload.perPage,
        page: payload.page,
        status: payload.status,
      },
    },
  );
};
const fetchAppointmentById = async id => {
  return axiosInstance.get(
    process.env.REACT_APP_URL_API + `/api/appointment/detail?id=${id}`,
  );
};
const fetchUpdateStatusAppointment = async payload => {
  return axiosInstance.put(
    process.env.REACT_APP_URL_API + `/api/appointment/update-status`,
    payload,
  );
};
const handleGetAppointmentList = function* (action) {
  try {
    yield delay(100);
    yield put({
      type: manageAppointmentActions.getListAppointmentPending.type,
    });

    const response = yield call(fetchListAppointment, action.payload);
    yield put({
      type: manageAppointmentActions.getListAppointmentSuccess.type,
      payload: {
        appointments: response?.data?.data,
        meta: response?.data?.meta?.pagination,
      },
    });
    toast.success(translate('LIST_APPOINTMENT_SUCCESS'));
  } catch (e) {
    yield put({
      type: manageAppointmentActions.getListAppointmentError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const handleGetAppointmentDetail = function* (action) {
  try {
    yield put({
      type: manageAppointmentActions.getAppointmentDetailPending.type,
    });

    const response = yield call(fetchAppointmentById, action.payload.id);
    yield put({
      type: manageAppointmentActions.getAppointmentDetailSuccess.type,
      payload: { appointmentDetail: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageAppointmentActions.getAppointmentDetailError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const handleUpdateStatusAppointment = function* (action) {
  try {
    yield put({
      type: manageAppointmentActions.updateStatusAppointmentPending.type,
    });
    const response = yield call(fetchUpdateStatusAppointment, action.payload);
    yield put({
      type: manageAppointmentActions.updateStatusAppointmentSuccess.type,
      payload: { appointmentDetail: response?.data?.data },
    });
    toast.success(translate('UPDATE_STATUS_APPOINTMENT_SUCCESS'));
  } catch (e) {
    yield put({
      type: manageAppointmentActions.updateStatusAppointmentError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const manageAppointmentSaga = function* () {
  yield takeLatest(
    `${manageAppointmentActions.getListAppointmentPending.type}_saga`,
    handleGetAppointmentList,
  );
  yield takeEvery(
    `${manageAppointmentActions.getAppointmentDetailPending.type}_saga`,
    handleGetAppointmentDetail,
  );
  yield takeEvery(
    `${manageAppointmentActions.updateStatusAppointmentPending.type}_saga`,
    handleUpdateStatusAppointment,
  );
};
export default manageAppointmentSaga;
