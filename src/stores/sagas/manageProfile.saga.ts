import { put, call, takeLatest, takeEvery, delay } from 'redux-saga/effects';
import { manageProfileActions } from '../slices/manageProfile.slice';
import { get } from 'lodash';
import axiosInstance from '../../services/axios.service';
import { toast } from 'react-toastify';
import { translate } from '../../translates/translate';

const fetchListEmployee = async (payload: {
  perPage: number;
  page: number;
  status?: number;
}) => {
  return axiosInstance.get(`/api/employee/list`, {
    params: {
      per_page: payload.perPage,
      page: payload.page,
      status: payload.status,
    },
  });
};

const fetchEmployeeDetail = async (payload: { employeeId: number }) => {
  return axiosInstance.get(
    `/api/employee/curriculum-vitae/detail?employee_id=${payload.employeeId}&include= working_histories,employee`,
  );
};

const fetchListRoles = async () => {
  return axiosInstance.get(`/api/role/index?record_per_page=-1`);
};

const fetchListPermissions = async (payload: { roleId: string }) => {
  return axiosInstance.get(`api/module/index?role_id=${payload.roleId}`);
};

const fetchUpdateUser = async payload => {
  return axiosInstance.put(`/api/auth/update`, payload);
};

const createAccount = async (payload: {
  username?: string;
  password: string;
  employeeId: string;
  role: string;
  status: string;
}) => {
  return axiosInstance.post('api/employee/user/create ', {
    username: payload.username,
    password: payload.password,
    employee_id: payload.employeeId,
    role_id: payload.role,
    status: payload.status,
  });
};

const handleGetEmployeeList = function* (action) {
  try {
    yield delay(100);
    yield put({
      type: manageProfileActions.getListEmployeePending.type,
    });

    const response = yield call(fetchListEmployee, action.payload);
    yield put({
      type: manageProfileActions.getListEmployeeSuccess.type,
      payload: {
        profiles: response?.data?.data,
        meta: response?.data?.meta?.pagination,
      },
    });
    toast.success(translate('LIST_EMPLOYEE_ONL_SUCCESS'));
  } catch (e) {
    yield put({
      type: manageProfileActions.getListEmployeeError.type,
      payload: { message: get(e, 'message') },
    });
    if (get(get(e, 'response'), 'data')) {
      toast.error(get(get(e, 'response'), 'data'));
    } else {
      toast.error(get(e, 'message'));
    }
  }
};

const handleGetEmployeeDetail = function* (action) {
  try {
    yield put({
      type: manageProfileActions.getEmployeeDetailPending.type,
    });

    const response = yield call(fetchEmployeeDetail, action.payload);
    yield put({
      type: manageProfileActions.getEmployeeDetailSuccess.type,
      payload: { employee: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageProfileActions.getListEmployeeError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const handleGetListRole = function* () {
  try {
    yield delay(100);
    yield put({
      type: manageProfileActions.getListRolePending.type,
    });

    const response = yield call(fetchListRoles);
    yield put({
      type: manageProfileActions.getListRoleSuccess.type,
      payload: { roles: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageProfileActions.getListRoleError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const handleGetListPermissions = function* (action) {
  try {
    yield put({
      type: manageProfileActions.getListPermissionOfRolePending.type,
    });

    const response = yield call(fetchListPermissions, action.payload);
    yield put({
      type: manageProfileActions.getListPermissionOfRoleSuccess.type,
      payload: { permissions: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageProfileActions.getListPermissionOfRoleError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const handleCreateAccount = function* (action) {
  try {
    yield put({
      type: manageProfileActions.createAccountPending.type,
    });

    const response = yield call(createAccount, action.payload);
    yield put({
      type: manageProfileActions.createAccountSuccess.type,
      payload: { account: response?.data?.data },
    });
    toast.success(translate('CREATE_ACCOUNT_SUCCESS'));
  } catch (e) {
    yield put({
      type: manageProfileActions.createAccountError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const handleUpdateUser = function* (action) {
  try {
    yield put({
      type: manageProfileActions.updateAccountPending.type,
    });
    const data = {
      user_id: action.payload.userId,
      role_id: action.payload.role,
      password: action.payload.password,
      status: action.payload.status,
    };
    const response = yield call(fetchUpdateUser, data);
    yield put({
      type: manageProfileActions.updateAccountSuccess.type,
      payload: { userInfo: response?.data?.data },
    });
    toast.success(translate('UPDATE_USER_SUCCESS'));
  } catch (e) {
    yield put({
      type: manageProfileActions.updateAccountError.type,
      payload: { message: get(e, 'message') },
    });
    console.log(e);
    toast.error(get(e, 'message'));
  }
};

const manageProfileSaga = function* () {
  yield takeLatest(
    `${manageProfileActions.getListEmployeePending.type}_saga`,
    handleGetEmployeeList,
  );
  yield takeEvery(
    `${manageProfileActions.getEmployeeDetailPending.type}_saga`,
    handleGetEmployeeDetail,
  );
  yield takeLatest(
    `${manageProfileActions.getListRolePending.type}_saga`,
    handleGetListRole,
  );
  yield takeEvery(
    `${manageProfileActions.getListPermissionOfRolePending.type}_saga`,
    handleGetListPermissions,
  );
  yield takeEvery(
    `${manageProfileActions.createAccountPending.type}_saga`,
    handleCreateAccount,
  );
  yield takeEvery(
    `${manageProfileActions.updateAccountPending.type}_saga`,
    handleUpdateUser,
  );
};

export default manageProfileSaga;
