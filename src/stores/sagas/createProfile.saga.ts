import { call, put, takeLatest } from 'redux-saga/effects';
import { get, map } from 'lodash';
import { toast } from 'react-toastify';

import axiosInstance from '../../services/axios.service';
import { createProfileAction } from '../slices/createProfile.slice';
import {
  IHistoryResolveInsurance,
  IInfoContract,
  IInfoHealth,
  IInfoInsurance,
  IInfoPersonal,
  ISalaryAndAllowance,
  IWorkingHistory,
  IWorkingProcess,
} from '../types/createProfile';

const fetchListDirectManagers = () => {
  return axiosInstance.get(`api/employee/list?type=employee&status=active`);
};

const fetchListMasterData = (key: string | { keys: string[] }) => {
  if (typeof key === 'object') {
    return axiosInstance.get(`/api/master-data/list-multi-key`, {
      params: key,
    });
  }
  return axiosInstance.get(`api/master-data/list?key=${key}`);
};

const createEmployeeProfile = (payload: {
  infoPersonal?: IInfoPersonal;
  workingHistory?: IWorkingHistory[];
  infoContract?: IInfoContract;
  infoSalary?: ISalaryAndAllowance;
  infoInsurance?: IInfoInsurance;
  workingProcess?: IWorkingProcess[];
  historyResolveInsurance?: IHistoryResolveInsurance[];
  infoHealth?: IInfoHealth;
}) => {
  const {
    infoPersonal,
    workingHistory,
    infoContract,
    infoSalary,
    infoInsurance,
    workingProcess,
    historyResolveInsurance,
    infoHealth,
  } = payload;
  return axiosInstance.post('api/employee/electronic-record/create', {
    curriculum_vitae: {
      name: infoPersonal?.fullName,
      nationality_id: infoPersonal?.nationality,
      email: infoPersonal?.email,
      phone_number: infoPersonal?.phoneNumber,
      dob: infoPersonal?.birthday,
      gender: infoPersonal?.gender,
      country: infoPersonal?.nationality,
      marital: infoPersonal?.isMarried,
      ethnic: infoPersonal?.ethnic,
      region_id: infoPersonal?.religions,
      identification: infoPersonal?.identification,
      place_of_issue: infoPersonal?.placeOfIssue,
      date_of_issue: infoPersonal?.dateOfIssue,
      tax_code: infoPersonal?.taxCode,
      onboard_date: infoPersonal?.onboardDate,
      leader_id: infoPersonal?.directManager,
      subsidiary_id: infoPersonal?.subsidiary,
      position_id: infoPersonal?.position,
      address: infoPersonal?.address,
      bank_account_number: infoPersonal?.bankAccountNumber,
      bank_account_name: infoPersonal?.bankAccountName,
      bank_name: infoPersonal?.bankName,
      bank_branch: infoPersonal?.bankBranch,
      identification_front: infoPersonal?.identificationFront
        ? infoPersonal.identificationFront[0]?.id
        : undefined,
      identification_back: infoPersonal?.identificationBack
        ? infoPersonal.identificationBack[0]?.id
        : null,
      face_image: infoPersonal?.faceImage
        ? infoPersonal.faceImage[0]?.id
        : undefined,
      fingerprint: infoPersonal?.fingerprint
        ? infoPersonal.fingerprint[0]?.id
        : undefined,
      working_histories: map(workingHistory, w => ({
        start_date: w.workStart,
        end_date: w.workEnd,
        position: w.workPosition,
        company: w.workCompany,
      })),
    },
    health: {
      blood_pressure: infoHealth?.bloodPressure,
      heartbeat: infoHealth?.heartbeat,
      height: infoHealth?.height,
      weight: infoHealth?.weight,
      blood_group: infoHealth?.bloodGroup,
      note: infoHealth?.note,
      health_records: infoHealth?.healthRecords
        ? infoHealth.healthRecords[0]?.id
        : undefined,
    },
    contract: {
      // contract_code: infoContract?.contractCode,
      contract_type_id: infoContract?.contractType,
      contract_files: infoContract?.contractFiles
        ? infoContract?.contractFiles[0].id
        : undefined,
      department_id: infoContract?.department,
      // get from master data
      // position_id: infoContract?.position,
      // nhap tay
      function: infoContract?.role,
      // nhap tay
      rank: infoContract?.rank,
      // nhap tay and type is float
      skill_coefficient: infoContract?.skillCoefficient,
      // get from master data city
      workplace: infoContract?.workplace,
      employment_type_id: infoContract?.employmentType,
      effective_date: infoContract?.effectiveDate,
      signed_date: infoContract?.signDate,
      signer: infoContract?.signer,
      digital_signature: infoContract?.digitalSignature,
      apply_from_date: infoSalary?.applyFromDate,
      note: infoSalary?.note,
      payment_type: infoSalary?.paymentType,
      salary: infoSalary?.salary,
      insurance_book_number: infoInsurance?.bookNumber,
      insurance_book_status: infoInsurance?.bookStatus,
      insurers: infoInsurance?.legalEntitySubmit,
      insurance_card_number: infoInsurance?.numberCard,
      insurance_city_code: infoInsurance?.provinceCodeReleased,
      medical_examination_place: infoInsurance?.medicalRegister,
      card_received_date: infoInsurance?.insuranceCardReceiptDate,
      card_returned_date: infoInsurance?.insuranceCardReturnDate,
      contract_health_records: infoInsurance?.contractHealthRecords
        ? infoInsurance.contractHealthRecords[0].id
        : undefined,
      contract_working_histories: map(workingProcess, w => ({
        worked_from_date: w.processWorkingFromDate,
        worked_to_date: w.processWorkingToDate,
        from_department: w.fromDepartment,
        to_department: w.toDepartment,
        reason: w.position,
        job_transfer_proofs: w.files ? w.files[0].id : undefined,
      })),
      contract_allowances: map(infoSalary?.allowances, a => ({
        allowance_id: a.typeId,
        benefit: a.allowance,
      })),
      contract_insurance_processed_histories: map(
        historyResolveInsurance,
        hri => ({
          insurance_policy_id: hri.type,
          received_date: hri.receiptDate,
          refunded_date: hri.paymentDate,
          completed_date: hri.completeDate,
          refund_amount: hri.amount,
        }),
      ),
    },
  });
};

const handleGetListDirectManagers = function* () {
  try {
    yield put({
      type: createProfileAction.getListDirectManagersPending.type,
    });

    const response = yield call(fetchListDirectManagers);
    yield put({
      type: createProfileAction.getListDirectManagersSuccess.type,
      payload: { managers: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: createProfileAction.getListDirectManagersError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const handleGetMasterData = function* () {
  try {
    yield put({
      type: createProfileAction.getMasterDataPending.type,
    });

    const response = yield call(fetchListMasterData, {
      keys: [
        'allowance',
        'position',
        'employment',
        'insurance_policy',
        'nationality',
        'religion',
        'contract_type',
        'salary_type',
        'city',
        'title',
      ],
    });
    yield put({
      type: createProfileAction.getMasterDataSuccess.type,
      payload: response?.data?.data,
    });
  } catch (e) {
    yield put({
      type: createProfileAction.getMasterDataError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const handleCreateEmployeeProfile = function* (action) {
  try {
    yield put({
      type: createProfileAction.createEmployeeProfilePending.type,
    });

    const response = yield call(createEmployeeProfile, action.payload);
    yield put({
      type: createProfileAction.createEmployeeProfileSuccess.type,
      payload: response?.data?.data,
    });
  } catch (e) {
    yield put({
      type: createProfileAction.createEmployeeProfileError.type,
      payload: {
        message: get(e, 'message'),
        errors: get(e, 'response.data.errors', {}),
      },
    });
    toast.error(get(e, 'message'));
  }
};

const createProfileSaga = function* () {
  yield takeLatest(
    `${createProfileAction.getListDirectManagersPending.type}_saga`,
    handleGetListDirectManagers,
  );
  yield takeLatest(
    `${createProfileAction.getMasterDataPending.type}_saga`,
    handleGetMasterData,
  );
  yield takeLatest(
    `${createProfileAction.createEmployeeProfilePending.type}_saga`,
    handleCreateEmployeeProfile,
  );
};

export default createProfileSaga;
