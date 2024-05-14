import { put, call, takeLatest, delay, takeEvery } from 'redux-saga/effects';
import { get, isNil, omitBy } from 'lodash';
import axiosInstance from '../../services/axios.service';
import { toast } from 'react-toastify';
import { manageAssetActions } from '../slices/manageAsset.slice';
import { IFileInfo } from '../types';
import { translate } from '../../translates/translate';

const fetchListAsset = async (payload: {
  perPage: number;
  page: number;
  status?: number;
}) => {
  return axiosInstance.get(process.env.REACT_APP_URL_API + `/api/asset/list/`, {
    params: {
      per_page: payload.perPage,
      page: payload.page,
      status: payload.status,
    },
  });
};
const fetchAssetById = async id => {
  return axiosInstance.get(
    process.env.REACT_APP_URL_API + `/api/asset/detail?id=${id}`,
  );
};
const createAsset = async (payload: {
  name: string;
  code: string;
  management_code: string;
  management_unit: string;
  insurance_contract: string;
  original_price: number;
  residual_price: number;
  asset_images: IFileInfo[];
}) => {
  return axiosInstance.post(
    process.env.REACT_APP_URL_API + `/api/asset/create`,
    {
      name: payload.name,
      code: payload.code,
      management_code: payload.management_code,
      management_unit: payload.management_unit,
      insurance_contract: payload.insurance_contract,
      original_price: payload.original_price,
      residual_price: payload.residual_price,
      asset_images: payload?.asset_images
        ? payload.asset_images[0]?.id
        : undefined,
    },
  );
};
const updateAsset = async payload => {
  const newMedia = payload?.infoAsset?.media?.new;
  const deleteMedia = payload?.infoAsset?.media?.delete;
  const media = {
    new: {},
    delete: {},
  };
  let mediaCheck = false;
  if (newMedia) {
    media.new = {
      asset_images: newMedia?.asset_images ? newMedia?.asset_images : undefined,
    };
    mediaCheck = true;
  }
  if (deleteMedia) {
    media.delete = {
      asset_images: deleteMedia?.asset_images
        ? [deleteMedia?.asset_images]
        : undefined,
    };
    mediaCheck = true;
  }
  const data = omitBy(
    {
      asset_id: payload?.asset_id,
      name: payload?.infoAsset?.name,
      code: payload?.infoAsset?.code,
      management_code: payload?.infoAsset?.management_code,
      management_unit: payload?.infoAsset?.management_unit,
      insurance_contract: payload?.infoAsset?.insurance_contract,
      status: payload?.infoAsset?.status,
      original_price: payload?.infoAsset?.original_price,
      residual_price: payload?.infoAsset?.residual_price,
      media: mediaCheck ? media : undefined,
    },
    isNil,
  );
  return await axiosInstance.put('api/asset/update', data);
};
const fetchListAssetDelivery = async (payload: {
  perPage: number;
  page: number;
  status?: number;
  asset_id?: string;
}) => {
  return axiosInstance.get(
    process.env.REACT_APP_URL_API +
      `/api/asset/delivery-history/list?asset_id=${payload.asset_id}`,
    {
      params: {
        per_page: payload.perPage,
        page: payload.page,
        status: payload.status,
        asset_id: payload.asset_id,
      },
    },
  );
};
const fetchAssetDeliveryById = async id => {
  return axiosInstance.get(
    process.env.REACT_APP_URL_API +
      `/api/asset/delivery-history/detail?id=${id}`,
  );
};
const createAssetDelivery = async (payload: {
  asset_id?: string;
  created_date: string;
  receiver: string;
  deliver: string;
  reason: string;
  place_of_use: string;
  attachments: string;
  code: string;
}) => {
  return axiosInstance.post(
    process.env.REACT_APP_URL_API + `/api/asset/delivery-history/create`,
    {
      asset_id: payload.asset_id,
      created_date: payload.created_date,
      receiver: payload.receiver,
      deliver: payload.deliver,
      reason: payload.reason,
      place_of_use: payload.place_of_use,
      attachments: payload.attachments,
      code: payload.code,
    },
  );
};
const fetchListAssetMaintenance = async (payload: {
  perPage: number;
  page: number;
  status?: number;
  asset_id?: string;
}) => {
  return axiosInstance.get(
    process.env.REACT_APP_URL_API +
      `/api/asset/maintenance/list?asset_id=${payload.asset_id}`,
    {
      params: {
        per_page: payload.perPage,
        page: payload.page,
        status: payload.status,
        asset_id: payload.asset_id,
      },
    },
  );
};
const fetchAssetMaintenanceById = async id => {
  return axiosInstance.get(
    process.env.REACT_APP_URL_API + `/api/asset/maintenance/detail?id=${id}`,
  );
};
const createAssetMaintenance = async (payload: {
  asset_id?: string;
  created_date: string;
  created_by: string;
  reason: string;
  description: string;
  proposal: string;
  code: string;
  causal: string;
}) => {
  return axiosInstance.post(
    process.env.REACT_APP_URL_API + `/api/asset/maintenance/create`,
    {
      asset_id: payload.asset_id,
      created_date: payload.created_date,
      created_by: payload.created_by,
      reason: payload.reason,
      description: payload.description,
      proposal: payload.proposal,
      code: payload.code,
      causal: payload.causal,
    },
  );
};
const handleGetAssetList = function* (action) {
  try {
    yield delay(100);
    yield put({
      type: manageAssetActions.getListAssetPending.type,
    });

    const response = yield call(fetchListAsset, action.payload);
    yield put({
      type: manageAssetActions.getListAssetSuccess.type,
      payload: {
        assets: response?.data?.data,
        meta: response?.data?.meta?.pagination,
      },
    });
    toast.success(translate('LIST_ASSET_SUCCESS'));
  } catch (e) {
    yield put({
      type: manageAssetActions.getListAssetError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const handleGetAssetDetail = function* (action) {
  try {
    yield put({
      type: manageAssetActions.getAssetDetailPending.type,
    });

    const response = yield call(fetchAssetById, action.payload.id);
    yield put({
      type: manageAssetActions.getAssetDetailSuccess.type,
      payload: { assetDetail: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageAssetActions.getAssetDetailError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const handleCreateAsset = function* (action) {
  try {
    yield put({
      type: manageAssetActions.createAssetPending.type,
    });

    const response = yield call(createAsset, action.payload);
    yield put({
      type: manageAssetActions.createAssetSuccess.type,
      payload: { assetDetail: response?.data?.data },
    });
    toast.success(translate('CREATE_ASSET_SUCCESS'));
  } catch (e) {
    yield put({
      type: manageAssetActions.createAssetError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const handleUpdateAsset = function* (action) {
  try {
    yield put({
      type: manageAssetActions.updateAssetPending.type,
    });
    const response = yield call(updateAsset, action.payload);
    yield put({
      type: manageAssetActions.updateAssetSuccess.type,
      payload: { assetDetail: response?.data?.data },
    });
    toast.success(translate('UPDATE_ASSET_SUCCESS'));
  } catch (e) {
    yield put({
      type: manageAssetActions.updateAssetError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const handleResetAssetDetail = function* () {
  yield put({
    type: manageAssetActions.resetAssetDetail.type,
  });
};
const handleGetAssetDelivery = function* (action) {
  try {
    yield delay(100);
    yield put({
      type: manageAssetActions.getListAssetDeliveryPending.type,
    });

    const response = yield call(fetchListAssetDelivery, action.payload);
    yield put({
      type: manageAssetActions.getListAssetDeliverySuccess.type,
      payload: {
        assetDeliveries: response?.data?.data,
        meta: response?.data?.meta?.pagination,
      },
    });
  } catch (e) {
    yield put({
      type: manageAssetActions.getListAssetDeliveryError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const handleGetAssetDeliveryDetail = function* (action) {
  try {
    yield put({
      type: manageAssetActions.getAssetDeliveryDetailPending.type,
    });

    const response = yield call(fetchAssetDeliveryById, action.payload);
    yield put({
      type: manageAssetActions.getAssetDeliveryDetailSuccess.type,
      payload: { assetDeliveryDetail: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageAssetActions.getAssetDeliveryDetailError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const handleGetAssetMaintenance = function* (action) {
  try {
    yield delay(100);
    yield put({
      type: manageAssetActions.getListAssetMaintenancePending.type,
    });

    const response = yield call(fetchListAssetMaintenance, action.payload);
    yield put({
      type: manageAssetActions.getListAssetMaintenanceSuccess.type,
      payload: {
        assetMaintenances: response?.data?.data,
        meta: response?.data?.meta?.pagination,
      },
    });
  } catch (e) {
    yield put({
      type: manageAssetActions.getListAssetMaintenanceError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const handleGetAssetMaintenanceDetail = function* (action) {
  try {
    yield put({
      type: manageAssetActions.getAssetMaintenanceDetailPending.type,
    });

    const response = yield call(fetchAssetMaintenanceById, action.payload);
    yield put({
      type: manageAssetActions.getAssetMaintenanceDetailSuccess.type,
      payload: { assetMaintenanceDetail: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: manageAssetActions.getAssetMaintenanceDetailError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const createAssetMaintenanceDetail = function* (action) {
  try {
    yield put({
      type: manageAssetActions.createAssetMaintenancePending.type,
    });

    const response = yield call(createAssetMaintenance, action.payload);
    yield put({
      type: manageAssetActions.createAssetMaintenanceSuccess.type,
      payload: { assetMaintenanceDetail: response?.data?.data },
    });
    toast.success(translate('CREATE_ASSET_MAINTENANCE_SUCCESS'));
  } catch (e) {
    yield put({
      type: manageAssetActions.createAssetMaintenanceError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const createAssetDeliveryDetail = function* (action) {
  try {
    yield put({
      type: manageAssetActions.createAssetDeliveryPending.type,
    });
    const response = yield call(createAssetDelivery, action.payload);
    yield put({
      type: manageAssetActions.createAssetDeliverySuccess.type,
      payload: { assetDeliveryDetail: response?.data?.data },
    });
    toast.success(translate('CREATE_ASSET_DELIVERY_SUCCESS'));
  } catch (e) {
    yield put({
      type: manageAssetActions.createAssetDeliveryError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const manageAssetSaga = function* () {
  yield takeLatest(
    `${manageAssetActions.getListAssetPending.type}_saga`,
    handleGetAssetList,
  );
  yield takeLatest(
    `${manageAssetActions.getAssetDetailPending.type}_saga`,
    handleGetAssetDetail,
  );
  yield takeEvery(
    `${manageAssetActions.createAssetPending.type}_saga`,
    handleCreateAsset,
  );
  yield takeEvery(
    `${manageAssetActions.updateAssetPending.type}_saga`,
    handleUpdateAsset,
  );
  yield takeLatest(
    `${manageAssetActions.resetAssetDetail.type}_saga`,
    handleResetAssetDetail,
  );
  yield takeLatest(
    `${manageAssetActions.getListAssetDeliveryPending.type}_saga`,
    handleGetAssetDelivery,
  );
  yield takeLatest(
    `${manageAssetActions.getAssetDeliveryDetailPending.type}_saga`,
    handleGetAssetDeliveryDetail,
  );
  yield takeEvery(
    `${manageAssetActions.createAssetDeliveryPending.type}_saga`,
    createAssetDeliveryDetail,
  );
  yield takeLatest(
    `${manageAssetActions.getListAssetMaintenancePending.type}_saga`,
    handleGetAssetMaintenance,
  );
  yield takeLatest(
    `${manageAssetActions.getAssetMaintenanceDetailPending.type}_saga`,
    handleGetAssetMaintenanceDetail,
  );
  yield takeEvery(
    `${manageAssetActions.createAssetMaintenancePending.type}_saga`,
    createAssetMaintenanceDetail,
  );
};
export default manageAssetSaga;
