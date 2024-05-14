import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { cloneDeep, map, set, unset } from 'lodash';

import InputDate from '../forms/InputDate';
import InputFile from '../forms/InputFile';
import {
  CollectionConstants,
  IMasterData,
  IWorkingHistory,
} from '../../../stores/types/createProfile';
import { IInfoPersonalUpdate } from '../../../stores/types/editProfile';
import { connect } from 'react-redux';
import { IEmployees } from '../../../stores/types';
import { IUnit } from '../../../stores/types/manageCompany';
import { FORMAT_YYYY_MM_DD } from '../../../constants/constant';
import moment from 'moment';
import { isValid } from 'date-fns';
import Log from '../../commons/log/Log';
import {
  logCurriculumVitae,
  logTitleType,
} from '../../../stores/types/manageLog';
import { useTranslation } from 'react-i18next';
import { translate } from '../../../translates/translate';

const LOCAL_OPTIONS = {
  gender: [
    { id: '', name: translate('selectGender') },
    { id: 'male', name: translate('male') },
    { id: 'female', name: translate('female') },
  ],
  maritalStatus: [
    { id: 0, name: translate('single') },
    { id: 1, name: translate('married') },
  ],
};

const MEDIA = [
  'identificationFront',
  'identificationBack',
  'faceImage',
  'fingerprint',
];

const CreateCurriculumVitae = ({
  nationalitiesState,
  religionsState,
  positionsState,
  managersState,
  listCompanyState,
  errors,
  personalData,
  historiesData,
  onChangePersonalData,
  onChangeHistoriesData,
  isShowLogCurriculumVitae,
  setIsShowLogCurriculumVitae,
}) => {
  const [infoPersonal, setInfoPersonal] = useState<IInfoPersonalUpdate>(
    personalData || {},
  );
  const [workingHistory, setWorkingHistory] = useState<IWorkingHistory[]>(
    historiesData || [
      { workStart: null, workEnd: null, workPosition: '', workCompany: '' },
    ],
  );

  const [nationalities, setNationalities] = useState<IMasterData[]>([]);
  const [religions, setReligions] = useState<IMasterData[]>([]);
  const [positions, setPosition] = useState<IMasterData[]>([]);
  const [directManagers, setDirectManagers] = useState<IEmployees[]>([]);
  const [workUnit, setWorkUnit] = useState<IUnit[]>([]);

  useEffect(() => {
    setNationalities([
      { id: '', name: translate('selectNationality'), code: '' },
      ...nationalitiesState,
    ]);
    setReligions([
      { id: '', name: translate('selectReligions'), code: '' },
      ...religionsState,
    ]);
    setPosition([
      { id: '', name: translate('selectJobTitle'), code: '' },
      ...positionsState,
    ]);
    setDirectManagers([
      { id: '', name: translate('selectManager') },
      ...managersState,
    ]);
    setWorkUnit([
      { id: '', name: translate('selectSubsidiary') },
      ...listCompanyState,
    ]);
  }, [
    nationalitiesState,
    religionsState,
    positionsState,
    managersState,
    listCompanyState,
  ]);

  useEffect(() => {
    if (personalData) {
      setInfoPersonal(personalData);
    }
  }, [personalData]);

  useEffect(() => {
    if (historiesData) {
      setWorkingHistory(historiesData);
    }
  }, [historiesData]);

  const handleAddWorkHistory = () => {
    setWorkingHistory(prevState => [
      ...prevState,
      { workStart: null, workEnd: null, workPosition: '', workCompany: '' },
    ]);
  };

  const handleRemoveWorkHistory = (index: number) => {
    const histories = map(workingHistory, (ps, idx) => {
      if (idx !== index) {
        return ps;
      }
      return {
        ...ps,
        isDeleted: true,
      };
    });
    setWorkingHistory(histories);
    onChangeHistoriesData('workingHistory', histories);
  };

  const handleChangeInfoPersonal = (
    col: string,
    val: string | Date | number | boolean | undefined | null,
  ) => {
    if (
      ['dateOfIssue', 'birthday', 'onboardDate'].includes(col) &&
      !isValid(new Date(val as string))
    ) {
      val = null;
    }
    const newInfoPersonal = {
      ...infoPersonal,
      [col]: val,
    };
    setInfoPersonal(newInfoPersonal);
    onChangePersonalData('infoPersonal', newInfoPersonal);
  };

  const handleChangeWorkingHistories = (
    idx: number,
    col: string,
    val: string | Date | number | boolean | undefined | null,
  ) => {
    const cloneHistory = cloneDeep(workingHistory);
    if (
      ['workStart', 'workEnd'].includes(col) &&
      !isValid(new Date(val as string))
    ) {
      val = null;
    }
    set(cloneHistory, `${idx}.${col}`, val);
    setWorkingHistory(cloneHistory);
    onChangeHistoriesData('workingHistory', cloneHistory);
  };

  const handleUpdateInfoPersonalFile = (col: string, id: string, files) => {
    if (MEDIA.includes(col)) {
      const newInfoPersonal = cloneDeep(infoPersonal);
      set(newInfoPersonal, `${col}`, files);
      set(newInfoPersonal, `media.new.${col}`, id);
      setInfoPersonal(newInfoPersonal);
      onChangePersonalData('infoPersonal', newInfoPersonal);
    }
  };

  const handleRemoveInfoPersonalFile = (col: string, id: string) => {
    if (MEDIA.includes(col)) {
      const newInfoPersonal = cloneDeep(infoPersonal);
      unset(newInfoPersonal, `${col}`);
      set(newInfoPersonal, `media.delete.${col}`, id);
      setInfoPersonal(newInfoPersonal);
      onChangePersonalData('infoPersonal', newInfoPersonal);
    }
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="row g-9 mb-3 d-none">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">Mã hồ sơ điện tử</label>
              <input type="text" className="form form-control" />
            </div>
          </div>
          <div className="text-left mt-5 mb-5">
            <h1 className="mb-3">{t('myProfile')}</h1>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('fullName')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('fullName')}
                value={infoPersonal?.fullName || ''}
                onChange={e =>
                  handleChangeInfoPersonal('fullName', e.target.value)
                }
              />
              {errors && errors.fullName ? (
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                  {errors.fullName}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="fv-row col-md-6">
              <label className="fs-6 fw-semibold mb-2">
                {t('nationality')}
              </label>
              <select
                className="form form-control form-select"
                name="nationalities"
                value={infoPersonal?.nationality || ''}
                onChange={e =>
                  handleChangeInfoPersonal('nationality', e.target.value)
                }
              >
                {map(nationalities, n => (
                  <option value={n.id} key={`nationality_${n.id}`}>
                    {n.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('email')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder="Email"
                value={infoPersonal?.email || ''}
                onChange={e =>
                  handleChangeInfoPersonal('email', e.target.value)
                }
              />
              {errors && errors.email ? (
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                  {errors.email}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="col-md-6 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('phoneNumber')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('phoneNumber')}
                value={infoPersonal?.phoneNumber || ''}
                onChange={e =>
                  handleChangeInfoPersonal('phoneNumber', e.target.value)
                }
              />
              {errors && errors.phoneNumber ? (
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                  {errors.phoneNumber}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('birthday')}</label>
              <InputDate
                className="form form-control"
                dateFormat="dd-MM-yyyy"
                placeholderText={t('birthday')}
                wrapperClassName="w-100"
                selected={
                  infoPersonal?.birthday
                    ? new Date(infoPersonal.birthday)
                    : null
                }
                onChange={date =>
                  handleChangeInfoPersonal(
                    'birthday',
                    moment(date).format(FORMAT_YYYY_MM_DD),
                  )
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('gender')}</label>
              <select
                className="form form-control form-select"
                name="gender"
                value={infoPersonal?.gender}
                onChange={e =>
                  handleChangeInfoPersonal('gender', e.target.value)
                }
              >
                {map(LOCAL_OPTIONS.gender, s => (
                  <option value={s.id} key={`gender_${s.id}`}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('homeTown')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('homeTown')}
                value={infoPersonal?.homeTown || ''}
                onChange={e =>
                  handleChangeInfoPersonal('homeTown', e.target.value)
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('maritalStatus')}
              </label>
              <select
                className="form form-control form-select"
                name="marital_status"
                value={infoPersonal?.isMarried ? 1 : 0}
                onChange={e =>
                  handleChangeInfoPersonal(
                    'isMarried',
                    !!Number(e.target.value),
                  )
                }
              >
                {map(LOCAL_OPTIONS.maritalStatus, m => (
                  <option value={m.id} key={`marital_status_${m.id}`}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('ethnic')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('ethnic')}
                value={infoPersonal?.ethnic || ''}
                onChange={e =>
                  handleChangeInfoPersonal('ethnic', e.target.value)
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('religions')}</label>
              <select
                className="form form-control form-select"
                name="religions"
                value={infoPersonal?.religions || ''}
                onChange={e =>
                  handleChangeInfoPersonal('religions', e.target.value)
                }
              >
                {map(religions, r => (
                  <option value={r.id} key={`religions_${r.id}`}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-4 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('identification')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('identification')}
                value={infoPersonal.identification || ''}
                onChange={e =>
                  handleChangeInfoPersonal('identification', e.target.value)
                }
              />
              {errors && errors.identification ? (
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                  {errors.identification}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="col-md-4 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('placeOfIssue')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('placeOfIssue')}
                value={infoPersonal.placeOfIssue || ''}
                onChange={e =>
                  handleChangeInfoPersonal('placeOfIssue', e.target.value)
                }
              />
            </div>
            <div className="col-md-4 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('dateOfIssue')}
              </label>
              <InputDate
                className="form form-control"
                dateFormat="dd-MM-yyyy"
                placeholderText={t('dateOfIssue')}
                wrapperClassName="w-100"
                selected={
                  infoPersonal?.dateOfIssue
                    ? new Date(infoPersonal.dateOfIssue)
                    : null
                }
                onChange={date =>
                  handleChangeInfoPersonal(
                    'dateOfIssue',
                    moment(date).format(FORMAT_YYYY_MM_DD),
                  )
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('identificationFront')}
              </label>
              <InputFile
                name={CollectionConstants.IDENTIFICATION_FRONT}
                value={infoPersonal.identificationFront || []}
                onChange={files =>
                  handleChangeInfoPersonal('identificationFront', files)
                }
                onRemoveFile={id =>
                  handleRemoveInfoPersonalFile('identificationFront', id)
                }
                onUpdateFile={(id, files) =>
                  handleUpdateInfoPersonalFile('identificationFront', id, files)
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('identificationBack')}
              </label>
              <InputFile
                name={CollectionConstants.IDENTIFICATION_BACK}
                value={infoPersonal.identificationBack || []}
                onChange={files =>
                  handleChangeInfoPersonal('identificationBack', files)
                }
                onRemoveFile={id =>
                  handleRemoveInfoPersonalFile('identificationBack', id)
                }
                onUpdateFile={(id, files) =>
                  handleUpdateInfoPersonalFile('identificationBack', id, files)
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('faceImage')}</label>
              <InputFile
                name={CollectionConstants.FACE_IMAGE}
                value={infoPersonal.faceImage || []}
                onChange={files => handleChangeInfoPersonal('faceImage', files)}
                onRemoveFile={id =>
                  handleRemoveInfoPersonalFile('faceImage', id)
                }
                onUpdateFile={(id, files) =>
                  handleUpdateInfoPersonalFile('faceImage', id, files)
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('fingerprint')}
              </label>
              <InputFile
                name={CollectionConstants.FINGER_PRINT}
                value={infoPersonal.fingerprint || []}
                onChange={files =>
                  handleChangeInfoPersonal('fingerprint', files)
                }
                onRemoveFile={id =>
                  handleRemoveInfoPersonalFile('fingerprint', id)
                }
                onUpdateFile={(id, files) =>
                  handleUpdateInfoPersonalFile('fingerprint', id, files)
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-4 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('taxCode')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('taxCode')}
                value={infoPersonal.taxCode || ''}
                onChange={e =>
                  handleChangeInfoPersonal('taxCode', e.target.value)
                }
              />
            </div>
            <div className="col-md-4 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('onboardDate')}
              </label>
              <InputDate
                className="form form-control"
                dateFormat="dd-MM-yyyy"
                placeholderText={t('onboardDate')}
                wrapperClassName="w-100"
                selected={
                  infoPersonal?.onboardDate
                    ? new Date(infoPersonal.onboardDate)
                    : null
                }
                onChange={date =>
                  handleChangeInfoPersonal(
                    'onboardDate',
                    moment(date).format(FORMAT_YYYY_MM_DD),
                  )
                }
              />
            </div>
            <div className="col-md-4 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('directManager')}
              </label>
              <select
                className="form form-control form-select"
                name="managers"
                value={infoPersonal.directManager}
                onChange={e =>
                  handleChangeInfoPersonal('directManager', e.target.value)
                }
              >
                {map(directManagers, m => (
                  <option value={m.id} key={`managers_${m.id}`}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('subsidiary')}</label>
              <select
                className="form form-control form-select"
                name="work-unit"
                value={infoPersonal?.subsidiary || ''}
                onChange={e =>
                  handleChangeInfoPersonal('subsidiary', e.target.value)
                }
              >
                {map(workUnit, item => (
                  <option value={item.id} key={`subsidiary_${item.id}`}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('jobTitle')}</label>
              <select
                className="form form-control form-select"
                name="positions"
                value={infoPersonal?.position || ''}
                onChange={e =>
                  handleChangeInfoPersonal('position', e.target.value)
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
                {t('employeeCode')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('employeeCode')}
                value={infoPersonal.employeeCode || ''}
                onChange={e =>
                  handleChangeInfoPersonal('employeeCode', e.target.value)
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('address')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('address')}
                value={infoPersonal.address || ''}
                onChange={e =>
                  handleChangeInfoPersonal('address', e.target.value)
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('bankAccountNumber')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('bankAccountNumber')}
                value={infoPersonal.bankAccountNumber || ''}
                onChange={e =>
                  handleChangeInfoPersonal('bankAccountNumber', e.target.value)
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('bankAccountName')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('bankAccountName')}
                value={infoPersonal.bankAccountName || ''}
                onChange={e =>
                  handleChangeInfoPersonal('bankAccountName', e.target.value)
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('bankName')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('bankName')}
                value={infoPersonal.bankName || ''}
                onChange={e =>
                  handleChangeInfoPersonal('bankName', e.target.value)
                }
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('bankBranch')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('bankBranch')}
                value={infoPersonal.bankBranch || ''}
                onChange={e =>
                  handleChangeInfoPersonal('bankBranch', e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-5 mt-5">
        <div className="col-md-6 text-left">
          <h1>{t('workingHistory')}</h1>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn fs-8" onClick={handleAddWorkHistory}>
            {t('createNew')}
            <i className="ki-outline ki-plus-circle fs-1 ms-2"></i>
          </button>
        </div>
      </div>
      {errors && errors.workEnd ? (
        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
          {errors.workEnd}
        </div>
      ) : (
        <></>
      )}
      {map(workingHistory, (history, idx) => {
        if (history?.isDeleted) {
          return <div key={idx}></div>;
        }

        return (
          <div key={idx} className="card mb-5">
            {workingHistory.length > 1 ? (
              <div
                className="btn text-end"
                onClick={() => handleRemoveWorkHistory(idx)}
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
                      history?.workStart ? new Date(history.workStart) : null
                    }
                    onChange={date =>
                      handleChangeWorkingHistories(
                        idx,
                        'workStart',
                        moment(date).format(FORMAT_YYYY_MM_DD),
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
                      history.workEnd ? new Date(history.workEnd) : null
                    }
                    onChange={date =>
                      handleChangeWorkingHistories(
                        idx,
                        'workEnd',
                        moment(date).format(FORMAT_YYYY_MM_DD),
                      )
                    }
                  />
                </div>
                <div className="col-md-4 fv-row">
                  <label className="fs-6 fw-semibold mb-2">
                    {t('position')}
                  </label>
                  <input
                    type="text"
                    className="form form-control"
                    placeholder={t('position')}
                    value={history.workPosition || ''}
                    onChange={e =>
                      handleChangeWorkingHistories(
                        idx,
                        'workPosition',
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
              <div className="row g-9 mb-3">
                <div className="col-md-6 fv-row">
                  <label className="fs-6 fw-semibold mb-2">
                    {t('company')}
                  </label>
                  <input
                    type="text"
                    className="form form-control"
                    placeholder={t('company')}
                    value={history.workCompany || ''}
                    onChange={e =>
                      handleChangeWorkingHistories(
                        idx,
                        'workCompany',
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
        show={isShowLogCurriculumVitae}
        onClose={() => setIsShowLogCurriculumVitae(false)}
        logKey={logTitleType.CURRICULUM_VITAE}
        logId={personalData?.id}
        logTitle={logCurriculumVitae}
      />
    </>
  );
};

const mapStateToProps = ({ createProfile, manageCompany }) => ({
  nationalitiesState: createProfile.nationalities,
  religionsState: createProfile.religions,
  positionsState: createProfile.positions,
  managersState: createProfile.managers,
  listCompanyState: manageCompany.listCompany,
});

export default connect(mapStateToProps)(CreateCurriculumVitae);
