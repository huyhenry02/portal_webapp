import React, { useEffect, useState } from 'react';
import InputFile from '../forms/InputFile';
import InputDate from '../forms/InputDate';
import {
  cloneDeep,
  filter,
  findIndex,
  findLastIndex,
  map,
  set,
  size,
  unset,
} from 'lodash';
import {
  CollectionConstants,
  IHistoryResolveInsurance,
  IMasterData,
  ISalaryAndAllowance,
} from '../../../stores/types/createProfile';
import {
  IInfoContractUpdate,
  IInfoInsuranceUpdate,
  IWorkingProcessUpdate,
} from '../../../stores/types/editProfile';
import { connect } from 'react-redux';
import moment from 'moment';
import { FORMAT_YYYY_MM_DD } from '../../../constants/constant';
import { isValid } from 'date-fns';
import Log from '../../commons/log/Log';
import { logTitleType, logContract } from '../../../stores/types/manageLog';
import { useTranslation } from 'react-i18next';
import { translate } from '../../../translates/translate';

const LOCAL_OPTIONS = {
  SIGN_NUMBER: [
    { id: 'active', name: translate('digitalSignature') },
    { id: 'inactive', name: translate('notDigitallySigned') },
  ],
  BOOK_STATUS: [
    { id: 'active', name: translate('activate') },
    { id: 'inactive', name: translate('inactivate') },
  ],
};

const MEDIA = ['contractFiles'];
const WORKING_PROCESS_MEDIA = ['files'];
const INSURANCE_MEDIA = ['contractHealthRecords'];

const CreateContract = ({
  infoContractData,
  infoSalaryData,
  infoInsuranceData,
  workingProcessData,
  historyResolveInsuranceData,
  onChangeInfoContractData,
  onChangeInfoSalaryData,
  onChangeInfoInsuranceData,
  onChangeWorkingProcessData,
  onChangeHistoryResolveInsuranceData,
  positionsState,
  contractTypesState,
  employmentTypesState,
  insuranceResolveTypesState,
  deviceSupportsState,
  citiesState,
  rolesState,
  salaryTypesState,
  listDepartmentState,
  isShowLogContract,
  setIsShowLogContract,
  errors,
}) => {
  const [infoContract, setInfoContract] = useState<IInfoContractUpdate>(
    infoContractData || {},
  );
  const [infoSalary, setInfoSalary] = useState<ISalaryAndAllowance>(
    infoSalaryData || {
      allowances: [
        {
          typeId: '',
          allowance: 0,
          isShowBtnAdd: true,
          isShowBtnRemove: false,
        },
      ],
    },
  );
  const [infoInsurance, setInfoInsurance] = useState<IInfoInsuranceUpdate>(
    infoInsuranceData || {},
  );
  const [workingProcess, setWorkingProcess] = useState<IWorkingProcessUpdate[]>(
    workingProcessData || [
      {
        processWorkingFromDate: null,
        processWorkingToDate: null,
        position: '',
        fromDepartment: '',
        toDepartment: '',
        files: [],
      },
    ],
  );
  const [historyResolveInsurance, setHistoryResolveInsurance] = useState<
    IHistoryResolveInsurance[]
  >(
    historyResolveInsuranceData || [
      {
        type: '',
        receiptDate: null,
        completeDate: null,
        paymentDate: null,
        amount: 0,
      },
    ],
  );

  const [positions, setPosition] = useState<IMasterData[]>([]);
  const [contractTypes, setContractTypes] = useState<IMasterData[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<IMasterData[]>([]);
  const [insuranceResolveTypes, setInsuranceResolveTypes] = useState<
    IMasterData[]
  >([]);
  const [deviceSupports, setDeviceSupports] = useState<IMasterData[]>([]);
  const [cities, setCities] = useState<IMasterData[]>([]);
  const [roles, setRoles] = useState<IMasterData[]>([]);
  const [salaryTypes, setSalaryTypes] = useState<IMasterData[]>([]);
  const [fromDepartment, setFromDepartment] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const [toDepartment, setToDepartment] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    setPosition([
      { id: '', name: translate('selectJobTitle'), code: '' },
      ...positionsState,
    ]);
    setContractTypes([
      { id: '', name: translate('selectContractType'), code: '' },
      ...contractTypesState,
    ]);
    setEmploymentTypes([
      { id: '', name: translate('selectWorkingType'), code: '' },
      ...employmentTypesState,
    ]);
    setInsuranceResolveTypes([
      { id: '', name: translate('selectRegime'), code: '' },
      ...insuranceResolveTypesState,
    ]);
    setDeviceSupports([
      { id: '', name: translate('selectAsset'), code: '' },
      ...deviceSupportsState,
    ]);
    setCities([
      { id: '', name: translate('selectWorkplace'), code: '' },
      ...citiesState,
    ]);
    setRoles([
      { id: '', name: translate('selectJobTitle'), code: '' },
      ...rolesState,
    ]);
    setSalaryTypes([
      { id: '', name: translate('selectPaymentType'), code: '' },
      ...salaryTypesState,
    ]);
    setFromDepartment([
      { id: '', name: translate('selectDepartment') },
      ...listDepartmentState,
    ]);
    setToDepartment([
      { id: '', name: translate('selectDepartment') },
      ...listDepartmentState,
    ]);
  }, [
    positionsState,
    contractTypesState,
    employmentTypesState,
    insuranceResolveTypesState,
    deviceSupportsState,
    citiesState,
    rolesState,
    salaryTypesState,
  ]);

  useEffect(() => {
    if (infoContractData) {
      setInfoContract(infoContractData);
    }
  }, [infoContractData]);

  useEffect(() => {
    if (infoSalaryData) {
      setInfoSalary(infoSalaryData);
    }
  }, [infoSalaryData]);

  useEffect(() => {
    if (infoInsuranceData) {
      setInfoInsurance(infoInsuranceData);
    }
  }, [infoInsuranceData]);

  useEffect(() => {
    if (workingProcessData) {
      setWorkingProcess(workingProcessData);
    }
  }, [workingProcessData]);

  useEffect(() => {
    if (historyResolveInsuranceData) {
      setHistoryResolveInsurance(historyResolveInsuranceData);
    }
  }, [historyResolveInsuranceData]);

  const handleAddWorkingProcess = () => {
    setWorkingProcess(prevState => [
      ...prevState,
      {
        processWorkingFromDate: null,
        processWorkingToDate: null,
        position: '',
        fromDepartment: undefined,
        toDepartment: undefined,
        files: [],
      },
    ]);
  };

  const handleRemoveWorkingProcess = (index: number) => {
    const processes = map(workingProcess, (wp, idx) => {
      if (idx !== index) {
        return wp;
      }
      return {
        ...wp,
        isDeleted: true,
      };
    });
    setWorkingProcess(processes);
    onChangeWorkingProcessData('workingProcess', processes);
  };

  const handleChangeWorkingProcess = (
    path: string,
    value: Date | string | null,
    col?: string,
  ) => {
    const cloneProcess = cloneDeep(workingProcess);
    if (
      col &&
      ['processWorkingFromDate', 'processWorkingToDate'].includes(col) &&
      !isValid(new Date(value as string))
    ) {
      value = null;
    }
    set(cloneProcess, `${path}`, value);
    setWorkingProcess(cloneProcess);
    onChangeWorkingProcessData('workingProcess', cloneProcess);
  };

  const handleAddHistoryResolveInsurance = () => {
    setHistoryResolveInsurance(prevState => [
      ...prevState,
      {
        type: '',
        receiptDate: null,
        completeDate: null,
        paymentDate: null,
        amount: 0,
      },
    ]);
  };

  const handleRemoveHistoryResolveInsurance = (index: number) => {
    const histories = map(historyResolveInsurance, (wp, idx) => {
      if (idx !== index) {
        return wp;
      }
      return {
        ...wp,
        isDeleted: true,
      };
    });
    setHistoryResolveInsurance(histories);
    onChangeHistoryResolveInsuranceData('historyResolveInsurance', histories);
  };

  const handleChangeHistoryInsuranceResolve = (
    path: string,
    val: string | Date | number | boolean | undefined | null,
    col?: string,
  ) => {
    const cloneHistory = cloneDeep(historyResolveInsurance);
    if (
      col &&
      ['receiptDate', 'completeDate', 'paymentDate'].includes(col) &&
      !isValid(new Date(val as string))
    ) {
      val = null;
    }
    set(cloneHistory, `${path}`, val);
    setHistoryResolveInsurance(cloneHistory);
    onChangeHistoryResolveInsuranceData(
      'historyResolveInsurance',
      cloneHistory,
    );
  };

  const handleChangeInfoContract = (
    col: string,
    val: string | Date | number | boolean | undefined | null,
  ) => {
    if (
      ['effectiveDate', 'signDate'].includes(col) &&
      !isValid(new Date(val as string))
    ) {
      val = null;
    }
    const info = {
      ...infoContract,
      [col]: val,
    };
    setInfoContract(info);
    onChangeInfoContractData('infoContract', info);
  };

  const handleChangeInfoSalary = (
    col: string,
    val:
      | string
      | Date
      | number
      | boolean
      | undefined
      | null
      | { typeId: string; allowance: number }[],
  ) => {
    if (['applyFromDate'].includes(col) && !isValid(new Date(val as string))) {
      val = null;
    }
    const info = {
      ...infoSalary,
      [col]: val,
    };
    setInfoSalary(info);
    onChangeInfoSalaryData('infoSalary', info);
  };

  const handleChangeInfoInsurance = (
    col: string,
    val: string | Date | number | boolean | undefined | null,
  ) => {
    if (
      ['insuranceCardReceiptDate', 'insuranceCardReturnDate'].includes(col) &&
      !isValid(new Date(val as string))
    ) {
      val = null;
    }
    const info = {
      ...infoInsurance,
      [col]: val,
    };
    setInfoInsurance(info);
    onChangeInfoInsuranceData('infoInsurance', info);
  };

  const handeAddAllowances = () => {
    setInfoSalary(prevState => ({
      ...prevState,
      allowances: [
        ...map(prevState.allowances, item => ({
          ...item,
          isShowBtnAdd: false,
          isShowBtnRemove: true,
        })),
        { typeId: '', allowance: 0, isShowBtnAdd: true, isShowBtnRemove: true },
      ],
    }));
  };

  const handleUpdateInfoContractFile = (
    col: string,
    id: string,
    files,
    idx?: number,
  ) => {
    if (MEDIA.includes(col)) {
      const newInfoContract = cloneDeep(infoContract);
      set(newInfoContract, `${col}`, files);
      set(newInfoContract, `media.new.${col}`, id);
      setInfoContract(newInfoContract);
      onChangeInfoContractData('infoContract', newInfoContract);
    }
    if (INSURANCE_MEDIA.includes(col)) {
      const newInfoInsurance = cloneDeep(infoInsurance);
      set(newInfoInsurance, `${col}`, files);
      set(newInfoInsurance, `media.new.${col}`, id);
      setInfoInsurance(newInfoInsurance);
      onChangeInfoInsuranceData('infoInsurance', newInfoInsurance);
    }
    if (WORKING_PROCESS_MEDIA.includes(col)) {
      const newWorkingProcess = cloneDeep(workingProcess);
      set(newWorkingProcess, `${idx}.files`, files);
      set(newWorkingProcess, `${idx}.media.new.${col}`, id);
      setWorkingProcess(newWorkingProcess);
      onChangeWorkingProcessData('workingProcess', newWorkingProcess);
    }
  };

  const handleRemoveInfoContractFile = (
    col: string,
    id: string,
    idx?: number,
  ) => {
    if (MEDIA.includes(col)) {
      const newInfoContract = cloneDeep(infoContract);
      unset(newInfoContract, `${col}`);
      set(newInfoContract, `media.delete.${col}`, id);
      setInfoContract(newInfoContract);
      onChangeInfoContractData('infoContract', newInfoContract);
    }
    if (INSURANCE_MEDIA.includes(col)) {
      const newInfoInsurance = cloneDeep(infoInsurance);
      unset(newInfoInsurance, `${col}`);
      set(newInfoInsurance, `media.delete.${col}`, id);
      setInfoInsurance(newInfoInsurance);
      onChangeInfoInsuranceData('infoInsurance', newInfoInsurance);
    }
    if (WORKING_PROCESS_MEDIA.includes(col)) {
      const newWorkingProcess = cloneDeep(workingProcess);
      unset(newWorkingProcess, `${idx}.files`);
      set(newWorkingProcess, `${idx}.media.delete.${col}`, id);
      setWorkingProcess(newWorkingProcess);
      onChangeWorkingProcessData('workingProcess', newWorkingProcess);
    }
  };

  const handleRemoveAllowances = (index: number) => {
    const newAllowances = map(infoSalary.allowances, (item, idx) => {
      if (idx === index) {
        return {
          ...item,
          isDeleted: true,
          isShowBtnAdd: false,
          isShowBtnRemove: false,
        };
      }
      return item;
    });
    if (
      index === size(newAllowances) - 1 ||
      size(filter(newAllowances, item => !item?.isDeleted)) === 1
    ) {
      const indexLatestActive = findLastIndex(
        newAllowances,
        item => !item?.isDeleted,
      );
      const firstIndexActive = findIndex(
        newAllowances,
        item => !item?.isDeleted,
      );
      set(newAllowances, `${indexLatestActive}.isShowBtnAdd`, true);
      if (firstIndexActive === indexLatestActive) {
        set(newAllowances, `${indexLatestActive}.isShowBtnRemove`, false);
      }
    }

    setInfoSalary(prevState => ({
      ...prevState,
      allowances: newAllowances,
    }));
    handleChangeInfoSalary('allowances', newAllowances);
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <div className="text-left mt-5 mb-5">
            <h1 className="mb-3">{t('information')}</h1>
          </div>

          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('contractCode')}
              </label>
              <input
                type="text"
                className="required form form-control"
                placeholder={t('contractCode')}
                value={infoContract?.contractCode || ''}
                // onChange={e =>
                //   handleChangeInfoContract('contractCode', e.target.value)
                // }
              />
              {/*{errors && errors.contractCode ? (*/}
              {/*  <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">*/}
              {/*    {errors.contractCode}*/}
              {/*  </div>*/}
              {/*) : (*/}
              {/*  <></>*/}
              {/*)}*/}
            </div>
            <div className="col-md-6 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('contractType')}
              </label>
              <select
                className="form form-control form-select"
                name={t('contractType')}
                value={infoContract?.contractType || ''}
                onChange={e =>
                  handleChangeInfoContract('contractType', e.target.value)
                }
              >
                {map(contractTypes, t => (
                  <option value={t.id} key={`contract_type_${t.id}`}>
                    {t.name}
                  </option>
                ))}
              </select>
              {errors && errors.contractType ? (
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                  {errors.contractType}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('contractFiles')}
              </label>
              <InputFile
                name={CollectionConstants.CONTRACT_FILES}
                value={infoContract?.contractFiles || []}
                onChange={files =>
                  handleChangeInfoContract('contractFiles', files)
                }
                onRemoveFile={id =>
                  handleRemoveInfoContractFile('contractFiles', id)
                }
                onUpdateFile={(id, files) =>
                  handleUpdateInfoContractFile('contractFiles', id, files)
                }
              />
              {errors && errors.contractFiles ? (
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                  {errors.contractFiles}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('Department')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('Department')}
                value={infoContract?.department || ''}
                onChange={e =>
                  handleChangeInfoContract('department', e.target.value)
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('position')}</label>
              <select
                className="form form-control form-select"
                name="positions"
                value={infoContract?.position || ''}
                onChange={e =>
                  handleChangeInfoContract('position', e.target.value)
                }
              >
                {map(positions, p => (
                  <option value={p.id} key={`position_${p.id}`}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('jobTitle')}</label>
              <select
                className="form form-control form-select"
                name="role"
                value={infoContract?.role || ''}
                onChange={e => handleChangeInfoContract('role', e.target.value)}
              >
                {map(roles, p => (
                  <option value={p.id} key={`role_${p.id}`}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('rank')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('rank')}
                value={infoContract?.rank || ''}
                onChange={e => handleChangeInfoContract('rank', e.target.value)}
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('skillCoefficient')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('skillCoefficient')}
                value={infoContract?.skillCoefficient || ''}
                onChange={e =>
                  handleChangeInfoContract('skillCoefficient', e.target.value)
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('workplace')}</label>
              <select
                className="form form-control form-select"
                name="positions"
                value={infoContract?.workplace || ''}
                onChange={e =>
                  handleChangeInfoContract('workplace', e.target.value)
                }
              >
                {map(cities, p => (
                  <option value={p.id} key={`city_${p.id}`}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('workingType')}
              </label>
              <select
                className="form form-control form-select"
                name="working_type"
                value={infoContract?.employmentType || ''}
                onChange={e =>
                  handleChangeInfoContract('employmentType', e.target.value)
                }
              >
                {map(employmentTypes, w => (
                  <option value={w.id} key={`employment_type_${w.id}`}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('effectiveDate')}
              </label>
              <InputDate
                className="form form-control"
                dateFormat="dd-MM-yyyy"
                placeholderText={t('effectiveDate')}
                wrapperClassName="w-100"
                selected={
                  infoContract?.effectiveDate
                    ? new Date(infoContract.effectiveDate)
                    : null
                }
                onChange={date =>
                  handleChangeInfoContract(
                    'effectiveDate',
                    moment(date).format(FORMAT_YYYY_MM_DD),
                  )
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-4 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('signDate')}</label>
              <InputDate
                className="form form-control"
                dateFormat="dd-MM-yyyy"
                placeholderText={t('signDate')}
                wrapperClassName="w-100"
                selected={
                  infoContract?.signDate
                    ? new Date(infoContract.signDate)
                    : null
                }
                onChange={date =>
                  handleChangeInfoContract(
                    'signDate',
                    moment(date).format(FORMAT_YYYY_MM_DD),
                  )
                }
              />
            </div>
            <div className="col-md-4 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('signer')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('signer')}
                value={infoContract?.signer || ''}
                onChange={e =>
                  handleChangeInfoContract('signer', e.target.value)
                }
              />
            </div>
            <div className="col-md-4 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('digitalSignature')}
              </label>
              <select
                className="form form-control form-select"
                name="digital_signature"
                value={infoContract?.digitalSignature || ''}
                onChange={e =>
                  handleChangeInfoContract('digitalSignature', e.target.value)
                }
              >
                {map(LOCAL_OPTIONS.SIGN_NUMBER, s => (
                  <option value={s.id} key={`digital_signature_${s.id}`}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-left mt-5 mb-5">
            <h1 className="mb-3">{t('salaryAndAllowances')}</h1>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('startDate')}</label>
              <InputDate
                className="form form-control"
                dateFormat="dd-MM-yyyy"
                placeholderText={t('startDate')}
                wrapperClassName="w-100"
                selected={
                  infoSalary?.applyFromDate
                    ? new Date(infoSalary.applyFromDate)
                    : null
                }
                onChange={date =>
                  handleChangeInfoSalary(
                    'applyFromDate',
                    moment(date).format(FORMAT_YYYY_MM_DD),
                  )
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('note')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('note')}
                value={infoSalary?.note || ''}
                onChange={e => handleChangeInfoSalary('note', e.target.value)}
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('paymentType')}
              </label>
              <select
                className="form form-control form-select"
                name="payment_type"
                value={infoSalary?.paymentType || ''}
                onChange={e =>
                  handleChangeInfoSalary('paymentType', e.target.value)
                }
              >
                {map(salaryTypes, s => (
                  <option value={s.id} key={`payment_type_${s.id}`}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('salary')}</label>
              <input
                type="number"
                className="form form-control"
                placeholder={t('salary')}
                value={infoSalary?.salary || ''}
                onChange={e => handleChangeInfoSalary('salary', e.target.value)}
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('allowances')}</label>
              {map(infoSalary.allowances, (device, idx) => {
                if (device?.isDeleted) {
                  return <div key={`device_${idx}`}></div>;
                }
                return (
                  <div className="row mb-1" key={`device_${idx}`}>
                    <div className="col-md-10">
                      <select
                        className="form form-control form-select"
                        name="device_supports"
                        value={device?.typeId || ''}
                        onChange={e => {
                          const cloneAllowances = cloneDeep(
                            infoSalary.allowances,
                          );
                          set(cloneAllowances, `${idx}.typeId`, e.target.value);
                          handleChangeInfoSalary('allowances', cloneAllowances);
                        }}
                      >
                        {map(deviceSupports, w => (
                          <option value={w.id} key={`device_supports_${w.id}`}>
                            {w.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-2">
                      <div className="row">
                        {device?.isShowBtnAdd ? (
                          <div className="col-md-6">
                            <button
                              className="btn fs-8 ps-0"
                              onClick={() => handeAddAllowances()}
                            >
                              <i className="ki-outline ki-plus-circle fs-1 ms-2"></i>
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                        {device?.isShowBtnRemove ? (
                          <div className="col-md-6">
                            <button
                              className="btn fs-8 ps-0"
                              onClick={() => handleRemoveAllowances(idx)}
                            >
                              <i className="ki-outline ki-minus-circle fs-1 ms-2"></i>
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('salary')}</label>
              {map(infoSalary.allowances, (device, idx) => {
                if (device?.isDeleted) {
                  return <div key={`amount_device_support_${idx}`}></div>;
                }
                return (
                  <input
                    key={`amount_device_support_${idx}`}
                    type="number"
                    className="form form-control mb-1"
                    placeholder={t('salary')}
                    value={device?.allowance || ''}
                    onChange={e => {
                      const cloneAllowances = cloneDeep(infoSalary.allowances);
                      set(cloneAllowances, `${idx}.allowance`, e.target.value);
                      handleChangeInfoSalary('allowances', cloneAllowances);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5 mt-5">
        <div className="col-md-6 text-left">
          <h1>{t('workProcess')}</h1>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn fs-8" onClick={handleAddWorkingProcess}>
            {t('createNew')}
            <i className="ki-outline ki-plus-circle fs-1 ms-2"></i>
          </button>
        </div>
      </div>
      {errors && errors.processWorkingToDate ? (
        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
          {errors.processWorkingToDate}
        </div>
      ) : (
        <></>
      )}
      {map(workingProcess, (item, idx) => {
        if (item?.isDeleted) {
          return <></>;
        }

        return (
          <div className="card mb-5" key={idx}>
            {workingProcess.length > 1 ? (
              <div
                className="btn text-end"
                onClick={() => handleRemoveWorkingProcess(idx)}
              >
                <i className="ki-outline ki-trash fs-1 ms-2"></i>
              </div>
            ) : (
              <></>
            )}
            <div className="card-body">
              <div className="row g-9 mb-3">
                <div className="col-md-4 fv-row">
                  <label className="fs-6 fw-semibold mb-2">
                    {t('startDate')}
                  </label>
                  <InputDate
                    className="form form-control"
                    dateFormat="dd-MM-yyyy"
                    placeholderText={t('startDate')}
                    wrapperClassName="w-100"
                    selected={
                      item?.processWorkingFromDate
                        ? new Date(item.processWorkingFromDate)
                        : null
                    }
                    onChange={date =>
                      handleChangeWorkingProcess(
                        `${idx}.processWorkingFromDate`,
                        moment(date).format(FORMAT_YYYY_MM_DD),
                        'processWorkingFromDate',
                      )
                    }
                  />
                </div>
                <div className="col-md-4 fv-row">
                  <label className="fs-6 fw-semibold mb-2">
                    {t('endDate')}
                  </label>
                  <InputDate
                    className="form form-control"
                    dateFormat="dd-MM-yyyy"
                    placeholderText={t('endDate')}
                    wrapperClassName="w-100"
                    selected={
                      item?.processWorkingToDate
                        ? new Date(item.processWorkingToDate)
                        : null
                    }
                    onChange={date =>
                      handleChangeWorkingProcess(
                        `${idx}.processWorkingToDate`,
                        moment(date).format(FORMAT_YYYY_MM_DD),
                        'processWorkingToDate',
                      )
                    }
                  />
                </div>
                <div className="col-md-4 fv-row">
                  <label className="fs-6 fw-semibold mb-2">
                    {t('position')}
                  </label>
                  <select
                    className="form form-control form-select"
                    name="positions"
                    value={item?.position}
                    onChange={e =>
                      handleChangeWorkingProcess(
                        `${idx}.position`,
                        e.target.value,
                      )
                    }
                  >
                    {map(positions, p => (
                      <option value={p.id} key={`positions_${p.id}`}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row g-9 mb-3">
                <div className="col-md-6 fv-row">
                  <label className="fs-6 fw-semibold mb-2">
                    {t('transferFromDepartment')}
                  </label>
                  <select
                    className="form form-control form-select"
                    name="from-department"
                    value={item?.fromDepartment || ''}
                    onChange={e =>
                      handleChangeWorkingProcess(
                        `${idx}.fromDepartment`,
                        e.target.value,
                      )
                    }
                  >
                    {map(fromDepartment, item => (
                      <option
                        value={item.id}
                        key={`${idx}_from_department_${item.id}`}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 fv-row">
                  <label className="fs-6 fw-semibold mb-2">
                    {t('arriveDepartment')}
                  </label>
                  <select
                    className="form form-control form-select"
                    name="to-department"
                    value={item?.toDepartment || ''}
                    onChange={e =>
                      handleChangeWorkingProcess(
                        `${idx}.toDepartment`,
                        e.target.value,
                      )
                    }
                  >
                    {map(toDepartment, item => (
                      <option
                        value={item.id}
                        key={`${idx}_to_department_${item.id}`}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row g-9 mb-3">
                <div className="col-md-6 fv-row">
                  <label className="fs-6 fw-semibold mb-2">
                    {t('evidenceOfJobTransfer')}
                  </label>
                  <InputFile
                    name={CollectionConstants.JOB_TRANSFER_PROOFS}
                    value={item?.files || []}
                    onChange={files =>
                      handleChangeWorkingProcess(`${idx}.files`, files)
                    }
                    onUpdateFile={(id, files) =>
                      handleUpdateInfoContractFile('files', id, files, idx)
                    }
                    onRemoveFile={id =>
                      handleRemoveInfoContractFile('files', id, idx)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="card mb-3">
        <div className="card-body">
          <div className="text-left mt-5 mb-5">
            <h1 className="mb-3">{t('insurance')}</h1>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('insuranceBookNumber')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('insuranceBookNumber')}
                value={infoInsurance?.bookNumber || ''}
                onChange={e =>
                  handleChangeInfoInsurance('bookNumber', e.target.value)
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('bookStatus')}</label>
              <select
                className="form form-control form-select"
                name="book_status"
                value={infoInsurance?.bookStatus || ''}
                onChange={e =>
                  handleChangeInfoInsurance('bookStatus', e.target.value)
                }
              >
                {map(LOCAL_OPTIONS.BOOK_STATUS, p => (
                  <option value={p.id} key={`book_status_${p.id}`}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('legalEntityClose')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('legalEntityClose')}
                value={infoInsurance?.legalEntitySubmit || ''}
                onChange={e =>
                  handleChangeInfoInsurance('legalEntitySubmit', e.target.value)
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('numberCard')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('numberCard')}
                value={infoInsurance?.numberCard || ''}
                onChange={e =>
                  handleChangeInfoInsurance('numberCard', e.target.value)
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('provinceCodeReleased')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('provinceCodeReleased')}
                value={infoInsurance?.provinceCodeReleased || ''}
                onChange={e =>
                  handleChangeInfoInsurance(
                    'provinceCodeReleased',
                    e.target.value,
                  )
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('medicalRegister')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('medicalRegister')}
                value={infoInsurance?.medicalRegister || ''}
                onChange={e =>
                  handleChangeInfoInsurance('medicalRegister', e.target.value)
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('insuranceCardReceiptDate')}
              </label>
              <InputDate
                className="form form-control"
                dateFormat="dd-MM-yyyy"
                placeholderText={t('insuranceCardReceiptDate')}
                wrapperClassName="w-100"
                selected={
                  infoInsurance?.insuranceCardReceiptDate
                    ? new Date(infoInsurance.insuranceCardReceiptDate)
                    : null
                }
                onChange={date =>
                  handleChangeInfoInsurance(
                    'insuranceCardReceiptDate',
                    moment(date).format(FORMAT_YYYY_MM_DD),
                  )
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('insuranceCardReturnDate')}
              </label>
              <InputDate
                className="form form-control"
                dateFormat="dd-MM-yyyy"
                placeholderText={t('insuranceCardReturnDate')}
                wrapperClassName="w-100"
                selected={
                  infoInsurance?.insuranceCardReturnDate
                    ? new Date(infoInsurance.insuranceCardReturnDate)
                    : null
                }
                onChange={date =>
                  handleChangeInfoInsurance(
                    'insuranceCardReturnDate',
                    moment(date).format(FORMAT_YYYY_MM_DD),
                  )
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('healthRecords')}
              </label>
              <InputFile
                name={CollectionConstants.CONTRACT_HEALTH_RECORDS}
                value={infoInsurance?.contractHealthRecords || []}
                onChange={files =>
                  handleChangeInfoInsurance('contractHealthRecords', files)
                }
                onUpdateFile={(id, files) =>
                  handleUpdateInfoContractFile(
                    'contractHealthRecords',
                    id,
                    files,
                  )
                }
                onRemoveFile={id =>
                  handleRemoveInfoContractFile('contractHealthRecords', id)
                }
              />
              {errors && errors.contractHealthRecords ? (
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                  {errors.contractHealthRecords}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5 mt-5">
        <div className="col-md-6 text-left">
          <h1>{t('historyResolveInsurance')}</h1>
        </div>
        <div className="col-md-6 text-end">
          <button
            className="btn fs-8"
            onClick={handleAddHistoryResolveInsurance}
          >
            {t('createNew')}
            <i className="ki-outline ki-plus-circle fs-1 ms-2"></i>
          </button>
        </div>
      </div>
      {map(historyResolveInsurance, (item, idx) => {
        if (item?.isDeleted) {
          return <></>;
        }

        return (
          <div className="card mb-3" key={idx}>
            {historyResolveInsurance.length > 1 ? (
              <div
                className="btn text-end"
                onClick={() => handleRemoveHistoryResolveInsurance(idx)}
              >
                <i className="ki-outline ki-trash fs-1 ms-2"></i>
              </div>
            ) : (
              <></>
            )}
            <div className="card-body">
              <div className="row g-9 mb-3">
                <div className="col-md-6 fv-row">
                  <label className="fs-6 fw-semibold mb-2">{t('regime')}</label>
                  <select
                    className="form form-control form-select"
                    name="insurance_resolve_type"
                    value={item?.type || ''}
                    onChange={e =>
                      handleChangeHistoryInsuranceResolve(
                        `${idx}.type`,
                        e.target.value,
                      )
                    }
                  >
                    {map(insuranceResolveTypes, w => (
                      <option
                        value={w.id}
                        key={`insurance_resolve_type_${w.id}`}
                      >
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 fv-row">
                  <label className="fs-6 fw-semibold mb-2">
                    {t('receiptDate')}
                  </label>
                  <InputDate
                    className="form form-control"
                    dateFormat="dd-MM-yyyy"
                    placeholderText={t('receiptDate')}
                    wrapperClassName="w-100"
                    selected={
                      item?.receiptDate ? new Date(item.receiptDate) : null
                    }
                    onChange={date =>
                      handleChangeHistoryInsuranceResolve(
                        `${idx}.receiptDate`,
                        moment(date).format(FORMAT_YYYY_MM_DD),
                        'receiptDate',
                      )
                    }
                  />
                </div>
              </div>
              <div className="row g-9 mb-3">
                <div className="col-md-6 fv-row">
                  <label className="fs-6 fw-semibold mb-2">
                    {t('paymentDate')}
                  </label>
                  <InputDate
                    className="form form-control"
                    dateFormat="dd-MM-yyyy"
                    placeholderText={t('paymentDate')}
                    wrapperClassName="w-100"
                    selected={
                      item?.paymentDate ? new Date(item.paymentDate) : null
                    }
                    onChange={date =>
                      handleChangeHistoryInsuranceResolve(
                        `${idx}.paymentDate`,
                        moment(date).format(FORMAT_YYYY_MM_DD),
                        'paymentDate',
                      )
                    }
                  />
                </div>
                <div className="col-md-6 fv-row">
                  <label className="fs-6 fw-semibold mb-2">
                    {t('completeDate')}
                  </label>
                  <InputDate
                    className="form form-control"
                    dateFormat="dd-MM-yyyy"
                    placeholderText={t('completeDate')}
                    wrapperClassName="w-100"
                    selected={
                      item?.completeDate ? new Date(item.completeDate) : null
                    }
                    onChange={date =>
                      handleChangeHistoryInsuranceResolve(
                        `${idx}.completeDate`,
                        moment(date).format(FORMAT_YYYY_MM_DD),
                        'completeDate',
                      )
                    }
                  />
                </div>
              </div>
              <div className="row g-9 mb-3">
                <div className="col-md-6 fv-row">
                  <label className="fs-6 fw-semibold mb-2">{t('salary')}</label>
                  <input
                    type="number"
                    className="form form-control"
                    placeholder={t('salary')}
                    value={item?.amount}
                    onChange={e =>
                      handleChangeHistoryInsuranceResolve(
                        `${idx}.amount`,
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <Log
        show={isShowLogContract}
        onClose={() => setIsShowLogContract(false)}
        logKey={logTitleType.CONTRACT}
        logId={infoContractData?.id}
        logTitle={logContract}
      />
    </>
  );
};

const mapStateToProps = ({ createProfile, manageCompany }) => ({
  positionsState: createProfile.positions,
  contractTypesState: createProfile.contractTypes,
  employmentTypesState: createProfile.employmentTypes,
  insuranceResolveTypesState: createProfile.insuranceResolveTypes,
  deviceSupportsState: createProfile.deviceSupports,
  citiesState: createProfile.cities,
  rolesState: createProfile.jobsTitle,
  salaryTypesState: createProfile.salaryTypes,
  listDepartmentState: manageCompany.listDepartment,
});

export default connect(mapStateToProps)(CreateContract);
