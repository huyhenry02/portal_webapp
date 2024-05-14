import { createSlice } from '@reduxjs/toolkit';
import { map } from 'lodash';
import { IPaginateResponse } from './manageRole.slice';
import {
  IAssetDetail,
  IAssetDelivery,
  IAssetDetailResponse,
  IAssetMaintenance,
} from '../types/manageAsset';
import { IFileResponse } from '../types';

type IInitialState = {
  assets: IAssetDetail[];
  assetDetail?: IAssetDetail;
  assetDeliveries: IAssetDelivery[];
  assetMaintenances: IAssetMaintenance[];
  assetDeliveryDetail?: IAssetDelivery;
  assetMaintenanceDetail?: IAssetMaintenance;
  paginate: IPaginateResponse;
  isLoading: boolean;
  isError: boolean;
  message: string;
};

const initialState: IInitialState = {
  assets: [],
  assetDetail: undefined,
  assetDeliveries: [],
  assetMaintenances: [],
  assetDeliveryDetail: undefined,
  assetMaintenanceDetail: undefined,
  paginate: {
    count: 0,
    current_page: 0,
    per_page: 0,
    total_page: 0,
    total: 0,
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
const mapFilesData = (data: IFileResponse) => {
  return map(data, file => ({
    id: file.uuid,
    path: file.original_url,
    lastModified: 1,
    lastModifiedDate: '',
    name: file.name,
    size: file.size,
    type: 'file',
    webkitRelativePath: '',
    originalURL: file.original_url,
  }));
};
const getListAssetPending = requestPending;
const getListAssetError = requestError;

const getListAssetSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { assets: IAssetDetail[]; meta: IPaginateResponse };
  },
) => {
  state.isLoading = false;
  state.assets = map(action.payload.assets, asset => ({
    id: asset.id,
    name: asset.name,
    code: asset.code,
    management_code: asset.management_code,
    management_unit: asset.management_unit,
    insurance_contract: asset.insurance_contract,
    status: asset.status,
    original_price: asset.original_price,
    residual_price: asset.residual_price,
    asset_images: asset.asset_images,
  }));
  state.paginate = {
    count: action.payload.meta?.count ?? 0,
    current_page: action.payload.meta?.current_page ?? 0,
    per_page: action.payload.meta?.per_page ?? 0,
    total_page: action.payload.meta?.total_page ?? 0,
    total: action.payload.meta?.total ?? 0,
  };
  state.isError = false;
  state.message = '';
};
const getListAssetDeliveryPending = requestPending;
const getListAssetDeliveryError = requestError;

const getListAssetDeliverySuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { assetDeliveries: IAssetDelivery[]; meta: IPaginateResponse };
  },
) => {
  state.isLoading = false;
  state.assetDeliveries = map(
    action.payload.assetDeliveries,
    assetDelivery => ({
      id: assetDelivery.id,
      created_date: assetDelivery.created_date,
      receiver: assetDelivery.receiver,
      deliver: assetDelivery.deliver,
      reason: assetDelivery.reason,
      place_of_use: assetDelivery.place_of_use,
      attachments: assetDelivery.attachments,
      code: assetDelivery.code,
      status: assetDelivery.status,
    }),
  );
  state.paginate = {
    count: action.payload.meta?.count ?? 0,
    current_page: action.payload.meta?.current_page ?? 0,
    per_page: action.payload.meta?.per_page ?? 0,
    total_page: action.payload.meta?.total_page ?? 0,
    total: action.payload.meta?.total ?? 0,
  };
  state.isError = false;
  state.message = '';
};
const getAssetDetailPending = requestPending;
const getAssetDetailError = requestError;
const getAssetDetailSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { assetDetail: IAssetDetailResponse };
  },
) => {
  const { assetDetail } = action.payload;
  state.assetDetail = {
    id: assetDetail.id,
    name: assetDetail.name,
    code: assetDetail.code,
    management_code: assetDetail.management_code,
    management_unit: assetDetail.management_unit,
    insurance_contract: assetDetail.insurance_contract,
    status: assetDetail.status,
    original_price: assetDetail.original_price,
    residual_price: assetDetail.residual_price,
    asset_images: assetDetail?.asset_images
      ? mapFilesData(assetDetail.asset_images)
      : [],
  };
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};
const getAssetDeliveryDetailPending = requestPending;
const getAssetDeliveryDetailError = requestError;
const getAssetDeliveryDetailSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { assetDeliveryDetail: IAssetDelivery };
  },
) => {
  const { assetDeliveryDetail } = action.payload;
  state.assetDeliveryDetail = {
    id: assetDeliveryDetail.id,
    created_date: assetDeliveryDetail.created_date,
    receiver: assetDeliveryDetail.receiver,
    deliver: assetDeliveryDetail.deliver,
    reason: assetDeliveryDetail.reason,
    place_of_use: assetDeliveryDetail.place_of_use,
    attachments: assetDeliveryDetail.attachments,
    code: assetDeliveryDetail.code,
    status: assetDeliveryDetail.status,
  };
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};
const getListAssetMaintenancePending = requestPending;
const getListAssetMaintenanceError = requestError;

const getListAssetMaintenanceSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: {
      assetMaintenances: IAssetMaintenance[];
      meta: IPaginateResponse;
    };
  },
) => {
  state.isLoading = false;
  state.assetMaintenances = map(
    action.payload.assetMaintenances,
    assetMaintenance => ({
      id: assetMaintenance.id,
      created_date: assetMaintenance.created_date,
      created_by: assetMaintenance.created_by,
      reason: assetMaintenance.reason,
      description: assetMaintenance.description,
      proposal: assetMaintenance.proposal,
      code: assetMaintenance.code,
      causal: assetMaintenance.causal,
      status: assetMaintenance.status,
    }),
  );
  state.paginate = {
    count: action.payload.meta?.count ?? 0,
    current_page: action.payload.meta?.current_page ?? 0,
    per_page: action.payload.meta?.per_page ?? 0,
    total_page: action.payload.meta?.total_page ?? 0,
    total: action.payload.meta?.total ?? 0,
  };
  state.isError = false;
  state.message = '';
};
const getAssetMaintenanceDetailPending = requestPending;
const getAssetMaintenanceDetailError = requestError;
const getAssetMaintenanceDetailSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { assetMaintenanceDetail: IAssetMaintenance };
  },
) => {
  const { assetMaintenanceDetail } = action.payload;
  state.assetMaintenanceDetail = {
    id: assetMaintenanceDetail.id,
    created_date: assetMaintenanceDetail.created_date,
    created_by: assetMaintenanceDetail.created_by,
    reason: assetMaintenanceDetail.reason,
    description: assetMaintenanceDetail.description,
    proposal: assetMaintenanceDetail.proposal,
    code: assetMaintenanceDetail.code,
    causal: assetMaintenanceDetail.causal,
    status: assetMaintenanceDetail.status,
  };
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};
const createAssetMaintenancePending = requestPending;
const createAssetMaintenanceError = requestError;
const createAssetMaintenanceSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { assetMaintenanceDetail: IAssetMaintenance };
  },
) => {
  const { assetMaintenanceDetail } = action.payload;
  state.assetMaintenanceDetail = {
    id: assetMaintenanceDetail.id,
    created_date: assetMaintenanceDetail.created_date,
    created_by: assetMaintenanceDetail.created_by,
    reason: assetMaintenanceDetail.reason,
    description: assetMaintenanceDetail.description,
    proposal: assetMaintenanceDetail.proposal,
    code: assetMaintenanceDetail.code,
    causal: assetMaintenanceDetail.causal,
    status: assetMaintenanceDetail.status,
  };
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};
const createAssetDeliveryPending = requestPending;
const createAssetDeliveryError = requestError;
const createAssetDeliverySuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { assetDeliveryDetail: IAssetDelivery };
  },
) => {
  const { assetDeliveryDetail } = action.payload;
  state.assetDeliveryDetail = {
    id: assetDeliveryDetail.id,
    created_date: assetDeliveryDetail.created_date,
    receiver: assetDeliveryDetail.receiver,
    deliver: assetDeliveryDetail.deliver,
    reason: assetDeliveryDetail.reason,
    place_of_use: assetDeliveryDetail.place_of_use,
    attachments: assetDeliveryDetail.attachments,
    code: assetDeliveryDetail.code,
    status: assetDeliveryDetail.status,
  };
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};
const createAssetPending = requestPending;
const createAssetError = requestError;
const createAssetSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { assetDetail: IAssetDetailResponse };
  },
) => {
  const { assetDetail } = action.payload;
  state.assetDetail = {
    id: assetDetail.id,
    name: assetDetail.name,
    code: assetDetail.code,
    management_code: assetDetail.management_code,
    management_unit: assetDetail.management_unit,
    insurance_contract: assetDetail.insurance_contract,
    status: assetDetail.status,
    original_price: assetDetail.original_price,
    residual_price: assetDetail.residual_price,
    asset_images: assetDetail?.asset_images
      ? mapFilesData(assetDetail.asset_images)
      : [],
  };
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};
const updateAssetPending = requestPending;
const updateAssetError = requestError;
const updateAssetSuccess = (state: IInitialState) => {
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};
const resetAssetDetail = (state: IInitialState) => {
  state.assetDetail = undefined;
};
const manageAssetSlice = createSlice({
  name: 'manage-asset',
  initialState,
  reducers: {
    getListAssetPending,
    getListAssetSuccess,
    getListAssetError,
    getAssetDetailPending,
    getAssetDetailError,
    getAssetDetailSuccess,
    getListAssetDeliveryPending,
    getListAssetDeliveryError,
    getListAssetDeliverySuccess,
    getAssetDeliveryDetailPending,
    getAssetDeliveryDetailError,
    getAssetDeliveryDetailSuccess,
    getListAssetMaintenancePending,
    getListAssetMaintenanceError,
    getListAssetMaintenanceSuccess,
    getAssetMaintenanceDetailPending,
    getAssetMaintenanceDetailError,
    getAssetMaintenanceDetailSuccess,
    createAssetMaintenancePending,
    createAssetMaintenanceError,
    createAssetMaintenanceSuccess,
    createAssetDeliveryPending,
    createAssetDeliveryError,
    createAssetDeliverySuccess,
    createAssetPending,
    createAssetError,
    createAssetSuccess,
    updateAssetPending,
    updateAssetError,
    updateAssetSuccess,
    resetAssetDetail,
  },
});

export default manageAssetSlice.reducer;
export const manageAssetActions = manageAssetSlice.actions;
