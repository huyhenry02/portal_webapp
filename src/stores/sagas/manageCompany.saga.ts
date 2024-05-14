import { call, put, takeEvery } from 'redux-saga/effects';
import { manageCompanyActions } from '../slices/manageCompany.slice';
import { get } from 'lodash';

import axiosInstance from '../../services/axios.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { translate } from '../../translates/translate';

const fetchCreateNewUnit = async (payload: {
  is_company: boolean;
  name: string;
  tax_code: string;
  address: string;
  establishment_date: Date;
  registration_number: string;
  date_of_issue: Date;
  place_of_issue: string;
  representative: string;
  position: string;
  active?: boolean;
  parent_id?: string;
  level_id: string;
  mandates?: string;
}) => {
  try {
    const result = await axiosInstance.post(`/api/hierarchy/create`, payload);
    toast.success(translate('CREATE_NEW_UNIT_SUCCESS'));
    return result;
  } catch (e) {
    toast.error(translate('CREATE_NEW_UNIT_FAIL'));
  }
};

const fetchGetMasterData = async (key: string) => {
  return await axiosInstance.get(`/api/master-data/list?key=${key}`);
};

const fetchGetListUnit = async () => {
  return await axiosInstance.get(`/api/hierarchy/index`);
};

const fetchGetUnitDetail = async (id: string) => {
  return await axiosInstance.get(`/api/hierarchy/detail?id=${id}`);
};

const fetchDeleteUnit = async (id: string) => {
  return await axiosInstance.delete(`/api/hierarchy/delete`, {
    data: { id },
  });
};

// const fetchGetListUnitByLevel = async (id: string) => {
//   const result = await axiosInstance.get(
//     `/api/hierarchy/get-by-level?level_id=${id}`,
//   );
//   return result;
// };

const fetchGetListUnitByCode = async (code: string) => {
  return await axiosInstance.get(`/api/hierarchy/get-by-code?code=${code}`);
};

const fetchUpdateUnit = async (payload: {
  id: string;
  is_company: boolean;
  name: string;
  tax_code?: string;
  address?: string;
  establishment_date: Date;
  registration_number?: string;
  date_of_issue?: Date;
  place_of_issue?: string;
  representative: string;
  position: string;
  active?: boolean;
  parent_id?: string;
  level_id: string;
  mandates?: string;
}) => {
  try {
    const { id, ...data } = payload;
    const result = await axiosInstance.put(
      `/api/hierarchy/update?id=${id}`,
      data,
    );
    toast.success(translate('UPDATE_UNIT_SUCCESS'));
    return result;
  } catch (e) {
    toast.error(translate('UPDATE_UNIT_FAIL'));
  }
};

const handleCreateNewUnit = function* (action) {
  try {
    yield put({
      type: manageCompanyActions.createNewUnitPending.type,
    });

    const response = yield call(fetchCreateNewUnit, action.payload);
    yield put({
      type: manageCompanyActions.createNewUnitSuccess.type,
      payload: response?.data?.data,
    });
  } catch (e) {
    yield put({
      type: manageCompanyActions.createNewUnitError.type,
      payload: { message: get(e, 'message') },
    });
  }
};

const handleGetListPosition = function* () {
  try {
    yield put({
      type: manageCompanyActions.getListPositionPending.type,
    });

    const response = yield call(fetchGetMasterData, 'position');
    yield put({
      type: manageCompanyActions.getListPositionSuccess.type,
      payload: { positions: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageCompanyActions.getListPositionError.type,
      payload: { message: get(e, 'message') },
    });
  }
};

const handleGetListLevel = function* () {
  try {
    yield put({
      type: manageCompanyActions.getListLevelPending.type,
    });

    const response = yield call(fetchGetMasterData, 'unit_level');
    yield put({
      type: manageCompanyActions.getListLevelSuccess.type,
      payload: { levels: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageCompanyActions.getListLevelError.type,
      payload: { message: get(e, 'message') },
    });
  }
};

const handleGetListUnit = function* () {
  try {
    yield put({
      type: manageCompanyActions.getListUnitPending.type,
    });

    const response = yield call(fetchGetListUnit);
    yield put({
      type: manageCompanyActions.getListUnitSuccess.type,
      payload: { units: response?.data?.data },
    });

    if (response?.data.data.length) {
      const unitDetailRes = yield call(
        fetchGetUnitDetail,
        response.data.data[0].id,
      );
      yield put({
        type: manageCompanyActions.getUnitDetailSuccess.type,
        payload: { unitDetail: unitDetailRes?.data?.data },
      });
    }
  } catch (e) {
    yield put({
      type: manageCompanyActions.getListUnitError.type,
      payload: { message: get(e, 'message') },
    });
  }
};

const handleUnitDetail = function* (action) {
  try {
    yield put({
      type: manageCompanyActions.getUnitDetailPending.type,
    });

    const response = yield call(fetchGetUnitDetail, action.payload);
    yield put({
      type: manageCompanyActions.getUnitDetailSuccess.type,
      payload: { unitDetail: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageCompanyActions.getUnitDetailError.type,
      payload: { message: get(e, 'message') },
    });
  }
};

const handleUnitDetailEdit = function* (action) {
  try {
    yield put({
      type: manageCompanyActions.getUnitDetailEditPending.type,
    });

    const response = yield call(fetchGetUnitDetail, action.payload);
    yield put({
      type: manageCompanyActions.getUnitDetailEditSuccess.type,
      payload: { unitDetailEdit: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageCompanyActions.getUnitDetailEditError.type,
      payload: { message: get(e, 'message') },
    });
  }
};

const handleUpdateUnit = function* (action) {
  try {
    yield put({
      type: manageCompanyActions.updateUnitPending.type,
    });

    const response = yield call(fetchUpdateUnit, action.payload);
    yield put({
      type: manageCompanyActions.updateUnitSuccess.type,
      payload: {
        updateUnit: response?.data?.data,
        oldParentId: action.payload.oldParentId,
      },
    });
  } catch (e) {
    yield put({
      type: manageCompanyActions.updateUnitError.type,
      payload: { message: get(e, 'message') },
    });
  }
};

const handleDeleteUnit = function* (action) {
  try {
    yield put({
      type: manageCompanyActions.deleteUnitPending.type,
    });

    yield call(fetchDeleteUnit, action.payload);
    yield put({
      type: manageCompanyActions.deleteUnitSuccess.type,
      payload: {
        id: action.payload,
      },
    });
  } catch (e) {
    yield put({
      type: manageCompanyActions.deleteUnitError.type,
      payload: { message: get(e, 'message') },
    });
  }
};

const handleListCompany = function* () {
  try {
    yield put({
      type: manageCompanyActions.getListCompanyPending.type,
    });

    const response = yield call(fetchGetListUnitByCode, 'company');
    yield put({
      type: manageCompanyActions.getListCompanySuccess.type,
      payload: response?.data?.data,
    });
  } catch (e) {
    yield put({
      type: manageCompanyActions.getListCompanyError.type,
      payload: { message: get(e, 'message') },
    });
  }
};

const handleListDepartment = function* () {
  try {
    yield put({
      type: manageCompanyActions.getListDepartmentPending.type,
    });

    const response = yield call(fetchGetListUnitByCode, 'department');
    yield put({
      type: manageCompanyActions.getListDepartmentSuccess.type,
      payload: response?.data?.data,
    });
  } catch (e) {
    yield put({
      type: manageCompanyActions.getListDepartmentError.type,
      payload: { message: get(e, 'message') },
    });
  }
};

const manageProfileSaga = function* () {
  yield takeEvery(
    `${manageCompanyActions.createNewUnitPending.type}_saga`,
    handleCreateNewUnit,
  );
  yield takeEvery(
    `${manageCompanyActions.getListPositionPending}_saga`,
    handleGetListPosition,
  );
  yield takeEvery(
    `${manageCompanyActions.getListLevelPending}_saga`,
    handleGetListLevel,
  );
  yield takeEvery(
    `${manageCompanyActions.getListUnitPending}_saga`,
    handleGetListUnit,
  );
  yield takeEvery(
    `${manageCompanyActions.getUnitDetailPending}_saga`,
    handleUnitDetail,
  );
  yield takeEvery(
    `${manageCompanyActions.getUnitDetailEditPending}_saga`,
    handleUnitDetailEdit,
  );
  yield takeEvery(
    `${manageCompanyActions.updateUnitPending}_saga`,
    handleUpdateUnit,
  );
  yield takeEvery(
    `${manageCompanyActions.deleteUnitPending}_saga`,
    handleDeleteUnit,
  );
  yield takeEvery(
    `${manageCompanyActions.getListCompanyPending}_saga`,
    handleListCompany,
  );
  yield takeEvery(
    `${manageCompanyActions.getListDepartmentPending}_saga`,
    handleListDepartment,
  );
};

export default manageProfileSaga;
