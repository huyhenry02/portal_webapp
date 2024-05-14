import { createSlice } from '@reduxjs/toolkit';
import {
  IContractDetail,
  IContractDetailResponse,
  IEmployeeDetail,
  IEmployeeDetailResponse,
  IFileResponse,
  IHealthDetail,
  IHealthDetailResponse,
} from '../types';
import moment from 'moment';
import { FORMAT_YYYY_MM_DD } from '../../constants/constant';
import { isEmpty, map } from 'lodash';

type IInitialState = {
  employeeDetail?: IEmployeeDetail;
  contractDetail?: IContractDetail;
  healthDetail?: IHealthDetail;
  isLoading: boolean;
  isError: boolean;
  errors: { [key: string]: string[] };
  message: string;
};

const initialState: IInitialState = {
  employeeDetail: undefined,
  contractDetail: undefined,
  healthDetail: undefined,
  isLoading: false,
  isError: false,
  errors: {},
  message: '',
};

const mapFilesData = (data: IFileResponse) => {
  return map(data, file => ({
    id: file.uuid,
    path: file.original_url,
    lastModified: 1,
    lastModifiedDate: '',
    name: file.name,
    size: file.size,
    type: '',
    webkitRelativePath: '',
    originalURL: file.original_url,
  }));
};

const requestPending = (state: IInitialState) => {
  state.isLoading = true;
  state.isError = false;
  state.message = '';
  state.errors = {};
};

const requestError = (
  state: IInitialState,
  action: {
    type: string;
    payload: { message: string; errors: { [key: string]: string[] } };
  },
) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload.message;
  state.errors = action.payload.errors;
};

const resetEmployeeDetail = (state: IInitialState) => {
  state.employeeDetail = undefined;
  state.contractDetail = undefined;
  state.healthDetail = undefined;
};

const getEmployeeDetailError = requestError;

const getEmployeeDetailPending = requestPending;

const getEmployeeDetailSuccess = (
  state: IInitialState,
  action: { type: string; payload: { employee: IEmployeeDetailResponse } },
) => {
  const { employee } = action.payload;
  state.employeeDetail = {
    id: employee.id,
    username: employee.code,
    employeeCode: employee.code,
    fullName: employee.name,
    birthday: employee?.dob
      ? moment(employee.dob).format(FORMAT_YYYY_MM_DD)
      : '',
    company: 'TEST NEED PROVIDE',
    department: 'TEST NEED PROVIDE',
    email: employee.email,
    phoneNumber: employee.phone_number,
    homeTown: employee.address,
    createdAt: 'TEST NEED PROVIDE',
    nationality: employee.country,
    gender: employee.gender,
    isMarried: employee.marital,
    ethnic: employee.ethnic,
    identification: employee.identification,
    placeOfIssue: employee.place_of_issue,
    dateOfIssue: employee?.date_of_issue
      ? moment(employee.date_of_issue).format(FORMAT_YYYY_MM_DD)
      : '',
    identificationFront: employee?.identification_front
      ? mapFilesData(employee.identification_front)
      : [],
    identificationBack: employee?.identification_back
      ? mapFilesData(employee.identification_back)
      : [],
    faceImage: employee?.face_image ? mapFilesData(employee.face_image) : [],
    fingerprint: employee?.fingerprint
      ? mapFilesData(employee.fingerprint)
      : [],
    taxCode: employee.tax_code,
    onboardDate: employee.onboard_date
      ? moment(employee.onboard_date).format(FORMAT_YYYY_MM_DD)
      : '',
    directManager: employee.leader_id,
    subsidiary: employee.subsidiary_id,
    position: employee.position_id,
    address: employee.address,
    bankAccountNumber: employee.bank_account_number,
    bankAccountName: employee.bank_account_name,
    bankName: employee.bank_name,
    bankBranch: employee.bank_branch,
    workingHistories: employee?.working_histories
      ? employee.working_histories.map(wh => ({
          id: wh.id,
          workStart: wh.start_date
            ? moment(wh.start_date).format(FORMAT_YYYY_MM_DD)
            : '',
          workEnd: wh.end_date
            ? moment(wh.end_date).format(FORMAT_YYYY_MM_DD)
            : '',
          workPosition: wh.position,
          workCompany: wh.company,
        }))
      : [],
  };
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};

const getContractDetailPending = requestPending;
const getContractDetailError = requestError;
const getContractDetailSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { contract: IContractDetailResponse };
  },
) => {
  const { contract } = action.payload;
  state.contractDetail = {
    ...state.contractDetail,
    infoContract: {
      id: contract.id,
      contractCode: contract.code,
      contractType: contract.contract_type_id,
      contractFiles: contract.contract_files
        ? mapFilesData(contract.contract_files)
        : [],
      department: contract.department_id,
      position: contract.position_id,
      role: contract.function,
      rank: contract.rank,
      skillCoefficient: contract.skill_coefficient,
      workplace: contract.workplace,
      employmentType: contract.employment_type_id,
      effectiveDate: contract.effective_date
        ? moment(contract.effective_date).format(FORMAT_YYYY_MM_DD)
        : '',
      signDate: contract.signed_date
        ? moment(contract.signed_date).format(FORMAT_YYYY_MM_DD)
        : '',
      signer: contract.signer,
      digitalSignature: contract.digital_signature,
    },
    infoSalary: {
      applyFromDate: contract.apply_from_date
        ? moment(contract.apply_from_date).format(FORMAT_YYYY_MM_DD)
        : '',
      note: contract.note,
      paymentType: contract.payment_type,
      salary: contract.salary,
      allowances: !isEmpty(contract.contract_allowances)
        ? map(contract.contract_allowances, item => ({
            id: item.id,
            typeId: item.allowance.id,
            allowance: Number(item.benefit),
            isDeleted: false,
          }))
        : [
            {
              typeId: '',
              allowance: 0,
              isShowBtnAdd: true,
              isShowBtnRemove: false,
            },
          ],
    },
    infoInsurance: {
      bookNumber: contract?.insurance_book_number,
      bookStatus: contract?.insurance_book_status,
      legalEntitySubmit: contract?.insurers,
      numberCard: contract?.insurance_card_number,
      provinceCodeReleased: contract?.insurance_city_code,
      medicalRegister: contract?.medical_examination_place,
      insuranceCardReceiptDate: contract?.card_received_date
        ? moment(contract?.card_received_date).format(FORMAT_YYYY_MM_DD)
        : '',
      insuranceCardReturnDate: contract?.card_returned_date
        ? moment(contract?.card_returned_date).format(FORMAT_YYYY_MM_DD)
        : '',
      contractHealthRecords: contract.contract_health_records
        ? mapFilesData(contract.contract_health_records)
        : [],
    },
    infoWorkingProcess: contract.contract_working_histories
      ? map(contract.contract_working_histories, item => ({
          id: item.id,
          processWorkingFromDate: item?.worked_from_date
            ? moment(item?.worked_from_date).format(FORMAT_YYYY_MM_DD)
            : '',
          processWorkingToDate: item?.worked_to_date
            ? moment(item?.worked_to_date).format(FORMAT_YYYY_MM_DD)
            : '',
          fromDepartment: item?.from_department,
          toDepartment: item?.to_department,
          position: item?.reason,
          files: mapFilesData(item?.job_transfer_proofs),
        }))
      : [],
    infoInsuranceProcessedHistories: map(
      contract?.contract_insurance_processed_histories,
      item => ({
        id: item.id,
        type: item.insurance_policy_id,
        receiptDate: item.received_date
          ? moment(item.received_date).format(FORMAT_YYYY_MM_DD)
          : '',
        completeDate: item.completed_date
          ? moment(item.completed_date).format(FORMAT_YYYY_MM_DD)
          : '',
        paymentDate: item?.refunded_date
          ? moment(item.refunded_date).format(FORMAT_YYYY_MM_DD)
          : '',
        amount: Number(item.refund_amount),
      }),
    ),
  };
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};

const getHealthDetailPending = requestPending;
const getHealthDetailError = requestError;
const getHealthDetailSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: { health: IHealthDetailResponse };
  },
) => {
  const { health } = action.payload;
  state.healthDetail = {
    ...state.healthDetail,
    id: health.id,
    bloodGroup: health.blood_group,
    bloodPressure: health.blood_pressure,
    heartbeat: health.heartbeat,
    height: health.height,
    weight: health.weight,
    note: health.note,
    healthRecords: health.health_records
      ? mapFilesData(health.health_records)
      : [],
  };
  state.isLoading = false;
  state.isError = false;
  state.message = '';
};

const updateCurriculumVitaePending = requestPending;
const updateCurriculumVitaeError = requestError;
const updateCurriculumVitaeSuccess = getEmployeeDetailSuccess;

const updateContractPending = requestPending;
const updateContractError = requestError;
const updateContractSuccess = getContractDetailSuccess;

const updateHealthPending = requestPending;
const updateHealthError = requestError;
const updateHealthSuccess = getHealthDetailSuccess;

const editProfileSlice = createSlice({
  name: 'edit-profile',
  initialState,
  reducers: {
    getEmployeeDetailPending,
    getEmployeeDetailSuccess,
    getEmployeeDetailError,
    getContractDetailPending,
    getContractDetailSuccess,
    getContractDetailError,
    getHealthDetailPending,
    getHealthDetailSuccess,
    getHealthDetailError,
    updateCurriculumVitaePending,
    updateCurriculumVitaeSuccess,
    updateCurriculumVitaeError,
    updateContractPending,
    updateContractSuccess,
    updateContractError,
    updateHealthPending,
    updateHealthSuccess,
    updateHealthError,
    resetEmployeeDetail,
  },
});

export default editProfileSlice.reducer;

export const editProfileAction = editProfileSlice.actions;
