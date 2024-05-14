import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { manageRoleActions } from '../slices/manageRole.slice';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import axiosInstance from '../../services/axios.service';
import { translate } from '../../translates/translate';

const fetchListRole = async (payload: {
  perPage: number;
  page: number;
  status?: number;
}) => {
  return axiosInstance.get(`/api/role/index`, {
    params: {
      per_page: payload.perPage,
      page: payload.page,
      status: payload.status,
    },
  });
};

const fetchRoleDetail = async (payload: { role: number }) => {
  return axiosInstance.get(`/api/role/detail?role_id=${payload.role}`);
};
const fetchListPermissions = async (payload: { roleId: string }) => {
  let params = '';
  if (payload.roleId) {
    params = `?role_id=${payload.roleId}`;
  }
  return axiosInstance.get(`api/module/index${params}`);
};

const postDeleteRole = async (payload: { roleId: string }) => {
  return axiosInstance.delete(`/api/role/delete`, {
    data: {
      id: payload.roleId,
    },
  });
};

const pushCreateOrUpdateRolePermissions = async (payload: {
  role: { id: string; description: string; status: string };
  permissions: string[];
}) => {
  let endpoint = 'api/role/create';
  let method = axiosInstance.post;
  if (payload.role.id) {
    endpoint = 'api/role/update';
    method = axiosInstance.patch;
  }
  const data = {
    description: payload.role.description,
    status: payload.role.status,
    permissions: payload.permissions,
  };
  if (payload.role.id) {
    data['id'] = payload.role.id;
  }
  return method(endpoint, data);
};

const handleGetRoleList = function* (action) {
  yield delay(100);
  try {
    yield put({
      type: manageRoleActions.getListRolePending.type,
    });

    const response = yield call(fetchListRole, action.payload);
    yield put({
      type: manageRoleActions.getListRoleSuccess.type,
      payload: {
        roles: response?.data?.data,
        meta: response?.data?.meta?.pagination,
      },
    });
    toast.success(translate('LIST_ROLE_ONL_SUCCESS'));
  } catch (e) {
    yield put({
      type: manageRoleActions.getListRoleError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const handleGetRoleDetail = function* (action) {
  try {
    yield put({
      type: manageRoleActions.getRoleDetailPending.type,
    });

    const response = yield call(fetchRoleDetail, action.payload);
    yield put({
      type: manageRoleActions.getRoleDetailSuccess.type,
      payload: { employee: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageRoleActions.getListRoleError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const handleGetListPermissions = function* (action) {
  yield delay(100);
  try {
    yield put({
      type: manageRoleActions.getListPermissionOfRolePending.type,
    });

    const response = yield call(fetchListPermissions, action.payload);
    yield put({
      type: manageRoleActions.getListPermissionOfRoleSuccess.type,
      payload: { permissions: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageRoleActions.getListPermissionOfRoleError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const handleCreateOrUpdateRolePermissions = function* (action) {
  try {
    yield put({
      type: manageRoleActions.createOrUpdateRolePermissionsPending.type,
    });

    const response = yield call(
      pushCreateOrUpdateRolePermissions,
      action.payload,
    );
    yield put({
      type: manageRoleActions.createOrUpdateRolePermissionsSuccess.type,
      payload: { role: response?.data?.data },
    });
    toast.success(response?.data?.message);
  } catch (e) {
    yield put({
      type: manageRoleActions.createOrUpdateRolePermissionsError.type,
      payload: { message: get(e, 'message') },
    });
    if (get(e, 'response.data.message')) {
      toast.error(get(e, 'response.data.message'));
    } else {
      toast.error(get(e, 'message'));
    }
  }
};
const handleDeleteRole = function* (action) {
  try {
    yield put({
      type: manageRoleActions.deleteRolePending.type,
    });

    const response = yield call(postDeleteRole, action.payload);
    yield put({
      type: manageRoleActions.deleteRoleSuccess.type,
      payload: {
        deleteResponse: response?.data,
      },
    });
    toast.success(translate('DELETE_ROLE_ONL_SUCCESS'));
  } catch (e) {
    yield put({
      type: manageRoleActions.deleteRoleError.type,
      payload: { message: get(e, 'message') },
    });
    if (get(e, 'response.data.message')) {
      toast.error(get(e, 'response.data.message'));
    } else {
      toast.error(get(e, 'message'));
    }
  }
};
const manageRoleSaga = function* () {
  yield takeLatest(
    `${manageRoleActions.getListRolePending.type}_saga`,
    handleGetRoleList,
  );
  yield takeLatest(
    `${manageRoleActions.getRoleDetailPending.type}_saga`,
    handleGetRoleDetail,
  );
  yield takeLatest(
    `${manageRoleActions.getListPermissionOfRolePending.type}_saga`,
    handleGetListPermissions,
  );
  yield takeEvery(
    `${manageRoleActions.createOrUpdateRolePermissionsPending.type}_saga`,
    handleCreateOrUpdateRolePermissions,
  );
  yield takeEvery(
    `${manageRoleActions.deleteRolePending.type}_saga`,
    handleDeleteRole,
  );
};

export default manageRoleSaga;
