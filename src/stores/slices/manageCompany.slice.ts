import { createSlice } from '@reduxjs/toolkit';
import { ILevel, IPosition, IUnit, IUnitDetail } from '../types/manageCompany';
import { filter, isEmpty, map } from 'lodash';
import {
  addItemTree,
  moveItemTree,
  removeItemTree,
  updateNameItemTree,
} from '../../layouts/components/tree/TreeComponent';

export type IInitialState = {
  units: IUnit[];
  positions: IPosition[];
  levels: ILevel[];
  unitDetail?: IUnitDetail;
  unitDetailEdit?: IUnitDetail;
  listCompany?: IUnit[];
  listDepartment?: IUnit[];
  isLoading: boolean;
  isError: boolean;
  message: string;
};

const initialState: IInitialState = {
  units: [],
  positions: [],
  levels: [],
  listCompany: [],
  listDepartment: [],
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

const createNewUnitPending = requestPending;
const createNewUnitError = requestError;
const createNewUnitSuccess = (
  state: IInitialState,
  action: { type: string; payload },
) => {
  const newUnit = action.payload;
  state.isLoading = false;
  state.units = addItemTree(state.units, newUnit);
  state.isError = false;
  state.message = '';
};

const updateUnitDetailState = (unitDetail, updateUnit, oldParent) => {
  if (oldParent) {
    return unitDetail;
  }

  if (unitDetail.id === updateUnit.id) {
    unitDetail = {
      ...unitDetail,
      ...updateUnit,
    };
  } else if (!isEmpty(unitDetail.child_units)) {
    unitDetail.child_units = map(unitDetail.child_units, item =>
      updateUnitDetailState(item, updateUnit, oldParent),
    );
  }

  return unitDetail;
};

const updateUnitPending = requestPending;
const updateUnitError = requestError;
const updateUnitSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: {
      updateUnit: { id: string; name: string; parent_id?: string };
      oldParentId?: string;
    };
  },
) => {
  const { updateUnit, oldParentId = null } = action.payload;
  state.isLoading = false;
  state.units = oldParentId
    ? moveItemTree(state.units, updateUnit, oldParentId)
    : updateNameItemTree(state.units, updateUnit);
  state?.unitDetail
    ? (state.unitDetail = updateUnitDetailState(
        state.unitDetail,
        updateUnit,
        oldParentId,
      ))
    : null;

  state.isError = false;
  state.message = '';
};

const removeUnitDetail = (unitDetail: IUnitDetail, unitId: string) => {
  if (unitDetail.id === unitId) {
    return undefined;
  }
  return {
    ...unitDetail,
    child_units: filter(unitDetail?.child_units, item => item.id != unitId),
  };
};

const deleteUnitPending = requestPending;
const deleteUnitError = requestError;
const deleteUnitSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { id: string };
  },
) => {
  const unitId = action.payload.id;
  state.isLoading = false;
  state.units = removeItemTree(state.units, unitId);
  state?.unitDetail
    ? (state.unitDetail = removeUnitDetail(state.unitDetail, unitId))
    : null;
  state.isError = false;
  state.message = '';
};

const getListUnitPending = requestPending;
const getListUnitError = requestError;
const getListUnitSuccess = (
  state: IInitialState,
  action: { type: string; payload: { units: IUnit[] } },
) => {
  state.isLoading = false;
  state.units = action.payload.units;
  state.isError = false;
  state.message = '';
};

const getListPositionPending = requestPending;
const getListPositionError = requestError;
const getListPositionSuccess = (
  state: IInitialState,
  action: { type: string; payload: { positions: IPosition[] } },
) => {
  state.isLoading = false;
  state.positions = map(
    action.payload.positions,
    position =>
      ({
        id: position.id,
        name: position.name,
        code: position.code,
      }) as IPosition,
  );
  state.isError = false;
  state.message = '';
};

const getListLevelPending = requestPending;
const getListLevelError = requestError;
const getListLevelSuccess = (
  state: IInitialState,
  action: { type: string; payload: { levels: ILevel[] } },
) => {
  state.isLoading = false;
  state.levels = map(
    action.payload.levels,
    level =>
      ({
        id: level.id,
        name: level.name,
        code: level.code,
      }) as ILevel,
  );
  state.isError = false;
  state.message = '';
};

const getUnitDetailPending = requestPending;
const getUnitDetailError = requestError;
const getUnitDetailSuccess = (
  state: IInitialState,
  action: { type: string; payload: { unitDetail: IUnitDetail } },
) => {
  state.isLoading = false;
  state.unitDetail = action.payload.unitDetail;
  state.isError = false;
  state.message = '';
};

const getUnitDetailEditPending = requestPending;
const getUnitDetailEditError = requestError;
const getUnitDetailEditSuccess = (
  state: IInitialState,
  action: { type: string; payload: { unitDetailEdit: IUnitDetail } },
) => {
  state.isLoading = false;
  state.unitDetailEdit = action.payload.unitDetailEdit;

  state.isError = false;
  state.message = '';
};

const getListCompanyPending = requestPending;
const getListCompanyError = requestError;
const getListCompanySuccess = (
  state: IInitialState,
  action: { type: string; payload: IUnit[] },
) => {
  state.isLoading = false;
  state.listCompany = map(action.payload, ({ id, name }) => ({ id, name }));
  state.isError = false;
  state.message = '';
};

const getListDepartmentPending = requestPending;
const getListDepartmentError = requestError;
const getListDepartmentSuccess = (
  state: IInitialState,
  action: { type: string; payload: IUnit[] },
) => {
  state.isLoading = false;
  state.listDepartment = map(action.payload, ({ id, name }) => ({ id, name }));

  state.isError = false;
  state.message = '';
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    createNewUnitPending,
    createNewUnitSuccess,
    createNewUnitError,
    getListUnitPending,
    getListUnitSuccess,
    getListUnitError,
    getListPositionPending,
    getListPositionSuccess,
    getListPositionError,
    getListLevelPending,
    getListLevelSuccess,
    getListLevelError,
    getUnitDetailPending,
    getUnitDetailSuccess,
    getUnitDetailError,
    getUnitDetailEditPending,
    getUnitDetailEditSuccess,
    getUnitDetailEditError,
    updateUnitPending,
    updateUnitSuccess,
    updateUnitError,
    deleteUnitPending,
    deleteUnitSuccess,
    deleteUnitError,
    getListCompanyPending,
    getListCompanySuccess,
    getListCompanyError,
    getListDepartmentPending,
    getListDepartmentSuccess,
    getListDepartmentError,
  },
});

export default dataSlice.reducer;
export const manageCompanyActions = dataSlice.actions;
