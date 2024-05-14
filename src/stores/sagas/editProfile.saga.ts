import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { editProfileAction } from '../slices/editProfile.slice';
import { get, isNil, map, omitBy, set, trim } from 'lodash';
import { toast } from 'react-toastify';
import axiosInstance from '../../services/axios.service';

const fetchEmployeeDetail = async (payload: { employeeId: number }) => {
  return axiosInstance.get(
    `/api/employee/curriculum-vitae/detail?employee_id=${payload.employeeId}&include= working_histories,employee`,
  );
};

const fetchGetContractDetail = async (payload: { employeeId: number }) => {
  return axiosInstance.get(
    `/api/employee/contract/detail?employee_id=${payload.employeeId}`,
  );
};

const fetchGetHealthDetail = async (payload: { employeeId: number }) => {
  return axiosInstance.get(
    `/api/employee/health/get?employee_id=${payload.employeeId}`,
  );
};

const updateCurriculumVitae = async payload => {
  const { infoPersonal, workingHistory } = payload;
  const newMedia = infoPersonal?.media?.new;
  const deleteMedia = infoPersonal?.media?.delete;
  const media = {
    new: {},
    delete: {},
  };
  let mediaCheck = false;
  if (newMedia) {
    media.new = {
      identification_front: newMedia?.identificationFront
        ? newMedia?.identificationFront
        : undefined,
      identification_back: newMedia?.identificationBack
        ? newMedia?.identificationBack
        : undefined,
      face_image: newMedia?.faceImage ? newMedia?.faceImage : undefined,
      fingerprint: newMedia?.fingerprint ? newMedia?.fingerprint : undefined,
    };
    mediaCheck = true;
  }
  if (deleteMedia) {
    media.delete = {
      identification_front: deleteMedia?.identificationFront
        ? [deleteMedia?.identificationFront]
        : undefined,
      identification_back: deleteMedia?.identificationBack
        ? [deleteMedia?.identificationBack]
        : undefined,
      face_image: deleteMedia?.faceImage ? [deleteMedia?.faceImage] : undefined,
      fingerprint: deleteMedia?.fingerprint
        ? [deleteMedia?.fingerprint]
        : undefined,
    };
    mediaCheck = true;
  }
  const workingHistories = map(workingHistory, item => {
    if (
      !item.id &&
      item.workStart &&
      item.workEnd &&
      trim(item.workPosition) === '' &&
      item.id === undefined
    ) {
      return;
    }
    return {
      id: item.id,
      start_date: item.workStart,
      end_date: item.workEnd,
      position: item.workPosition,
      company: item.workCompany,
      is_deleted: !!item.isDeleted,
    };
  });
  const data = omitBy(
    {
      id: infoPersonal?.id,
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
      working_histories: workingHistories,
      media: mediaCheck ? media : undefined,
    },
    isNil,
  );

  return axiosInstance.put('api/employee/curriculum-vitae/update', data);
};

const fetchUpdateContract = async payload => {
  const {
    infoContract,
    infoSalary,
    infoInsurance,
    workingProcess,
    historyResolveInsurance,
  } = payload;

  const newContractMedia = infoContract?.media?.new;
  const deleteContractMedia = infoContract?.media?.delete;
  const newInsuranceMedia = infoInsurance?.media?.new;
  const deleteInsuranceMedia = infoInsurance?.media?.delete;
  const contractMedia = {
    new: {},
    delete: {},
  };
  let mediaCheck = false;
  if (newContractMedia) {
    set(
      contractMedia,
      `new.contract_files`,
      newContractMedia?.contractFiles
        ? newContractMedia?.contractFiles
        : undefined,
    );
    mediaCheck = true;
  }
  if (deleteContractMedia) {
    set(
      contractMedia,
      `delete.contract_files`,
      deleteContractMedia?.contractFiles
        ? [deleteContractMedia?.contractFiles]
        : undefined,
    );
    mediaCheck = true;
  }
  if (newInsuranceMedia) {
    set(
      contractMedia,
      `new.contract_health_records`,
      newInsuranceMedia?.contractHealthRecords
        ? newInsuranceMedia?.contractHealthRecords
        : undefined,
    );
    mediaCheck = true;
  }
  if (deleteInsuranceMedia) {
    set(
      contractMedia,
      `delete.contract_health_records`,
      deleteInsuranceMedia?.contractHealthRecords
        ? [deleteInsuranceMedia?.contractHealthRecords]
        : undefined,
    );
    mediaCheck = true;
  }
  const data = omitBy(
    {
      id: infoContract.id,
      contract_type_id: infoContract.contract_type_id,
      department_id: infoContract.department,
      position_id: infoContract.position,
      function: infoContract.role,
      rank: infoContract.rank,
      skill_coefficient: infoContract.skillCoefficient,
      workplace: infoContract.workplace,
      employment_type_id: infoContract.employmentType,
      effective_date: infoContract.effectiveDate,
      signed_date: infoContract.signDate,
      signer: infoContract.signer,
      digital_signature: infoContract.digitalSignature,
      apply_from_date: infoSalary.applyFromDate,
      note: infoSalary.note,
      payment_type: infoSalary.paymentType,
      salary: infoSalary.salary,
      insurance_book_number: infoInsurance.bookNumber,
      insurance_book_status: infoInsurance.bookStatus,
      insurers: infoInsurance.legalEntitySubmit,
      insurance_card_number: infoInsurance.numberCard,
      insurance_city_code: infoInsurance.provinceCodeReleased,
      medical_examination_place: infoInsurance.medicalRegister,
      card_received_date: infoInsurance.insuranceCardReceiptDate,
      card_returned_date: infoInsurance.insuranceCardReturnDate,
      contract_working_histories: map(workingProcess, item => {
        if (
          !item.id &&
          !item.processWorkingFromDate &&
          !item.processWorkingToDate &&
          trim(item.fromDepartment) === '' &&
          trim(item.toDepartment) === '' &&
          item.position === undefined
        ) {
          return;
        }
        const newMedia = item?.media?.new;
        const deleteMedia = item?.media?.delete;

        const media = {
          new: {},
          delete: {},
        };
        let mediaCheck = false;
        if (newMedia) {
          media.new = {
            job_transfer_proofs: newMedia?.files ? newMedia?.files : undefined,
          };
          mediaCheck = true;
        }
        if (deleteMedia) {
          media.delete = {
            job_transfer_proofs: deleteMedia?.files
              ? [deleteMedia?.files]
              : undefined,
          };
          mediaCheck = true;
        }
        return {
          id: item?.id,
          worked_from_date: item.processWorkingFromDate,
          worked_to_date: item.processWorkingToDate,
          from_department: item.fromDepartment,
          to_department: item.toDepartment,
          reason: item.position,
          is_deleted: !!item.isDeleted,
          media: mediaCheck ? media : undefined,
        };
      }),
      contract_allowances: map(infoSalary.allowances, item => {
        if (!item.id && !item.typeId) {
          return;
        }
        return {
          id: item.id,
          allowance_id: item.typeId,
          benefit: item.allowance,
          is_deleted: !!item.isDeleted,
        };
      }),
      contract_insurance_processed_histories: map(
        historyResolveInsurance,
        item => {
          if (!item.id && !item.type) {
            return;
          }
          return {
            id: item.id,
            insurance_policy_id: item.type,
            refund_amount: item.amount,
            completed_date: item.completeDate,
            received_date: item.receiptDate,
            refunded_date: item.paymentDate,
            is_deleted: !!item.isDeleted,
          };
        },
      ),
      media: mediaCheck ? contractMedia : undefined,
    },
    isNil,
  );
  return await axiosInstance.put('api/employee/contract/update', data);
};

const updateHealth = async payload => {
  const newMedia = payload?.media?.new;
  const deleteMedia = payload?.media?.delete;

  const media = {
    new: {},
    delete: {},
  };
  let mediaCheck = false;
  if (newMedia) {
    media.new = {
      health_records: newMedia?.healthRecords
        ? newMedia?.healthRecords
        : undefined,
    };
    mediaCheck = true;
  }
  if (deleteMedia) {
    media.delete = {
      health_records: deleteMedia?.healthRecords
        ? [deleteMedia?.healthRecords]
        : undefined,
    };
    mediaCheck = true;
  }
  const data = omitBy(
    {
      id: payload?.id,
      blood_pressure: payload?.bloodPressure,
      heartbeat: payload?.heartbeat,
      height: payload?.height,
      weight: payload?.weight,
      blood_group: payload?.bloodGroup,
      note: payload?.note,
      media: mediaCheck ? media : undefined,
    },
    isNil,
  );

  return await axiosInstance.put('api/employee/health/update', data);
};

const handleGetEmployeeDetail = function* (action) {
  try {
    delay(500);
    yield put({
      type: editProfileAction.getEmployeeDetailPending.type,
    });

    const response = yield call(fetchEmployeeDetail, action.payload);
    yield put({
      type: editProfileAction.getEmployeeDetailSuccess.type,
      payload: { employee: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: editProfileAction.getEmployeeDetailError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const handleGetContractDetail = function* (action) {
  try {
    delay(500);
    yield put({
      type: editProfileAction.getContractDetailPending.type,
    });

    const response = yield call(fetchGetContractDetail, action.payload);
    yield put({
      type: editProfileAction.getContractDetailSuccess.type,
      payload: { contract: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: editProfileAction.getContractDetailError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const handleGetHealthDetail = function* (action) {
  try {
    delay(500);
    yield put({
      type: editProfileAction.getHealthDetailPending.type,
    });

    const response = yield call(fetchGetHealthDetail, action.payload);
    yield put({
      type: editProfileAction.getHealthDetailSuccess.type,
      payload: { health: response?.data?.data },
    });
  } catch (e) {
    yield put({
      type: editProfileAction.getHealthDetailError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const handleResetEmployeeDetail = function* () {
  yield put({
    type: editProfileAction.resetEmployeeDetail.type,
  });
};

const handleUpdateCurriculumVitae = function* (action) {
  try {
    yield put({
      type: editProfileAction.updateCurriculumVitaePending.type,
    });

    const response = yield call(updateCurriculumVitae, action.payload);
    yield put({
      type: editProfileAction.updateCurriculumVitaeSuccess.type,
      payload: { employee: response?.data?.data },
    });
    toast.success('Cập nhật sơ yếu lý lịch thành công');
  } catch (e) {
    yield put({
      type: editProfileAction.updateCurriculumVitaeError.type,
      payload: { message: get(e, 'response.data.message') },
    });
    toast.error(get(e, 'response.data.message'));
  }
};

const handleUpdateContract = function* (action) {
  try {
    yield put({
      type: editProfileAction.updateContractPending.type,
    });

    const response = yield call(fetchUpdateContract, action.payload);
    yield put({
      type: editProfileAction.updateContractSuccess.type,
      payload: { contract: response?.data?.data },
    });
    toast.success('Cập nhật hợp đồng thành công');
  } catch (e) {
    yield put({
      type: editProfileAction.updateContractError.type,
      payload: { message: get(e, 'response.data.message') },
    });
    toast.error(get(e, 'response.data.message'));
  }
};

const handleUpdateHealth = function* (action) {
  try {
    yield put({
      type: editProfileAction.updateHealthPending.type,
    });

    const response = yield call(updateHealth, action.payload);
    yield put({
      type: editProfileAction.updateHealthSuccess.type,
      payload: { health: response?.data?.data },
    });
    toast.success('Cập nhật sức khỏe thành công');
  } catch (e) {
    yield put({
      type: editProfileAction.updateHealthError.type,
      payload: { message: get(e, 'response.data.message') },
    });
    toast.error(get(e, 'response.data.message'));
  }
};

const editProfileSaga = function* () {
  yield takeLatest(
    `${editProfileAction.resetEmployeeDetail.type}_saga`,
    handleResetEmployeeDetail,
  );
  yield takeLatest(
    `${editProfileAction.getEmployeeDetailPending.type}_saga`,
    handleGetEmployeeDetail,
  );
  yield takeLatest(
    `${editProfileAction.getContractDetailPending.type}_saga`,
    handleGetContractDetail,
  );
  yield takeLatest(
    `${editProfileAction.getHealthDetailPending.type}_saga`,
    handleGetHealthDetail,
  );
  yield takeEvery(
    `${editProfileAction.updateCurriculumVitaePending}_saga`,
    handleUpdateCurriculumVitae,
  );
  yield takeEvery(
    `${editProfileAction.updateContractPending}_saga`,
    handleUpdateContract,
  );
  yield takeEvery(
    `${editProfileAction.updateHealthPending}_saga`,
    handleUpdateHealth,
  );
};

export default editProfileSaga;
