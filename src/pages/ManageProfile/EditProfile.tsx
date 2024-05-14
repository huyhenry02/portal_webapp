import React, { useEffect, useState } from 'react';
import { diff } from 'deep-diff';
import CreateHealth from '../../layouts/components/profiles/CreateHealth';
import CreateCurriculumVitae from '../../layouts/components/profiles/CreateCurriculumVitae';
import CreateContract from '../../layouts/components/profiles/CreateContract';
import {
  chain,
  every,
  forEach,
  get,
  has,
  isArray,
  last,
  map,
  set,
  size,
} from 'lodash';
import { connect } from 'react-redux';
import { createProfileAction } from '../../stores/slices/createProfile.slice';
import {
  IHistoryResolveInsurance,
  IInfoContract,
  IInfoHealth,
  IInfoInsurance,
  IInfoPersonal,
  ISalaryAndAllowance,
  IWorkingHistory,
  IWorkingProcess,
} from '../../stores/types/createProfile';
import Validation from '../../utils/validation';
import { manageCompanyActions } from '../../stores/slices/manageCompany.slice';
import { useParams } from 'react-router-dom';
import { editProfileAction } from '../../stores/slices/editProfile.slice';
import DefaultLoading from '../../layouts/commons/loading/DefaultLoading';
import { translate } from '../../translates/translate';
import { useTranslation } from 'react-i18next';
const CURRICULUM_VITAE_SCREEN = 1;
const CONTRACT_SCREEN = 2;
const HEALTH_SCREEN = 3;

const steps = [
  { id: CURRICULUM_VITAE_SCREEN, label: translate('curriculumVitae') },
  { id: CONTRACT_SCREEN, label: translate('contract') },
  { id: HEALTH_SCREEN, label: translate('health') },
];

const EditProfile = ({
  employeeDetailState,
  contractDetailState,
  healthDetailState,
  fetchDirectManagers,
  fetchListMasterData,
  fetchGetListCompany,
  fetchGetListDepartment,
  fetchGetEmployeeDetail,
  fetchGetContractDetail,
  fetchGetHealthDetail,
  updateCurriculumVitae,
  fetchUpdateContract,
  updateHealth,
  resetEmployeeDetail,
  isLoading,
}) => {
  const { id } = useParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<{
    infoPersonal?: IInfoPersonal;
    workingHistory?: IWorkingHistory[];
    infoContract?: IInfoContract;
    infoSalary?: ISalaryAndAllowance;
    infoInsurance?: IInfoInsurance;
    workingProcess?: IWorkingProcess[];
    historyResolveInsurance?: IHistoryResolveInsurance[];
    infoHealth?: IInfoHealth;
  }>({});
  const [isChange, setIsChange] = useState(false);
  const [dataWillUpdate, setDataWillUpdate] = useState<{
    infoPersonal?: IInfoPersonal;
    workingHistory?: IWorkingHistory[];
    infoContract?: IInfoContract;
    infoSalary?: ISalaryAndAllowance;
    infoInsurance?: IInfoInsurance;
    workingProcess?: IWorkingProcess[];
    historyResolveInsurance?: IHistoryResolveInsurance[];
    infoHealth?: IInfoHealth;
  }>({});
  const [errors, setErrors] = useState<{ [k: string]: string } | undefined>(
    undefined,
  );
  const [isShowLogProfile, setIsShowLogProfile] = useState(false);
  useEffect(() => {
    if (employeeDetailState) {
      const { workingHistories, ...infoPersonal } = employeeDetailState;
      setProfileData(prevState => ({
        ...prevState,
        infoPersonal,
        workingHistory: workingHistories,
      }));
    }
  }, [employeeDetailState]);

  useEffect(() => {
    if (healthDetailState) {
      setProfileData(prevState => ({
        ...prevState,
        infoHealth: healthDetailState,
      }));
    }
  }, [healthDetailState]);

  useEffect(() => {
    if (contractDetailState) {
      const {
        infoContract,
        infoInsurance,
        infoInsuranceProcessedHistories,
        infoSalary,
        infoWorkingProcess,
      } = contractDetailState;
      setProfileData(prevState => ({
        ...prevState,
        infoContract,
        infoInsurance,
        infoSalary: {
          ...infoSalary,
          allowances: map(infoSalary.allowances, (item, idx: number) => {
            if (idx !== size(infoSalary.allowances) - 1) {
              return {
                ...item,
                isShowBtnRemove: true,
                isShowBtnAdd: false,
              };
            }

            return item?.id
              ? {
                  ...item,
                  isShowBtnRemove: true,
                  isShowBtnAdd: true,
                }
              : {
                  ...item,
                  isShowBtnRemove: false,
                  isShowBtnAdd: true,
                };
          }),
        },
        workingProcess: infoWorkingProcess,
        historyResolveInsurance: infoInsuranceProcessedHistories,
      }));
    }
  }, [contractDetailState]);

  useEffect(() => {
    fetchDirectManagers();
    fetchListMasterData();
    fetchGetListCompany();
    fetchGetListDepartment();

    if (id) {
      fetchGetEmployeeDetail({ employeeId: id });
      fetchGetContractDetail({ employeeId: id });
      fetchGetHealthDetail({ employeeId: id });
    }

    return () => {
      resetEmployeeDetail();
    };
  }, []);

  const handleChangeProfileData = (
    key:
      | 'infoPersonal'
      | 'workingHistory'
      | 'infoContract'
      | 'infoSalary'
      | 'workingProcess'
      | 'historyResolveInsurance'
      | 'infoHealth',
    value:
      | IInfoPersonal
      | IWorkingHistory[]
      | IInfoContract
      | ISalaryAndAllowance
      | IInfoInsurance
      | IWorkingProcess[]
      | IHistoryResolveInsurance[]
      | IInfoHealth,
  ) => {
    setProfileData({
      ...profileData,
      [key]: value,
    });
  };

  const getDifference = () => {
    let tempDifferences;
    if (currentStep === CURRICULUM_VITAE_SCREEN && employeeDetailState) {
      const { workingHistories, ...infoPersonal } = employeeDetailState;
      tempDifferences = diff(
        { infoPersonal, workingHistory: workingHistories },
        {
          infoPersonal: profileData.infoPersonal,
          workingHistory: profileData.workingHistory,
        },
      );
    } else if (currentStep === CONTRACT_SCREEN && contractDetailState) {
      const {
        infoContract,
        infoInsurance,
        infoInsuranceProcessedHistories,
        infoSalary,
        infoWorkingProcess,
      } = contractDetailState;
      tempDifferences = diff(
        {
          infoContract,
          infoInsurance,
          infoSalary,
          workingProcess: infoWorkingProcess,
          historyResolveInsurance: infoInsuranceProcessedHistories,
        },
        {
          infoContract: profileData.infoContract,
          infoInsurance: profileData.infoInsurance,
          infoSalary: profileData.infoSalary,
          workingProcess: profileData.workingProcess,
          historyResolveInsurance: profileData.historyResolveInsurance,
        },
      );
    } else {
      tempDifferences = diff(
        {
          infoHealth: healthDetailState,
        },
        {
          infoHealth: profileData.infoHealth,
        },
      );
    }

    return tempDifferences;
  };

  const renderStep = () => {
    switch (currentStep) {
      case CURRICULUM_VITAE_SCREEN:
        return (
          <CreateCurriculumVitae
            personalData={profileData.infoPersonal}
            historiesData={profileData.workingHistory}
            onChangePersonalData={handleChangeProfileData}
            onChangeHistoriesData={handleChangeProfileData}
            isShowLogCurriculumVitae={isShowLogProfile}
            setIsShowLogCurriculumVitae={setIsShowLogProfile}
            errors={errors}
          />
        );
      case CONTRACT_SCREEN:
        return (
          <CreateContract
            infoContractData={profileData.infoContract}
            infoSalaryData={profileData.infoSalary}
            infoInsuranceData={profileData.infoInsurance}
            workingProcessData={profileData.workingProcess}
            historyResolveInsuranceData={profileData.historyResolveInsurance}
            onChangeInfoContractData={handleChangeProfileData}
            onChangeInfoSalaryData={handleChangeProfileData}
            onChangeInfoInsuranceData={handleChangeProfileData}
            onChangeWorkingProcessData={handleChangeProfileData}
            onChangeHistoryResolveInsuranceData={handleChangeProfileData}
            isShowLogContract={isShowLogProfile}
            setIsShowLogContract={setIsShowLogProfile}
            errors={errors}
          />
        );
      case HEALTH_SCREEN:
        return (
          <CreateHealth
            infoHealthData={profileData.infoHealth}
            onChangeInfoHealth={handleChangeProfileData}
            isShowLogHealth={isShowLogProfile}
            setIsShowLogHealth={setIsShowLogProfile}
            errors={errors}
          />
        );
      default:
        return <></>;
    }
  };

  const buildDataUpdate = differences => {
    const dataUpdate: {
      infoPersonal?: IInfoPersonal;
      workingHistory?: IWorkingHistory[];
      infoContract?: IInfoContract;
      infoSalary?: ISalaryAndAllowance;
      infoInsurance?: IInfoInsurance;
      workingProcess?: IWorkingProcess[];
      historyResolveInsurance?: IHistoryResolveInsurance[];
      infoHealth?: IInfoHealth;
    } = {};
    forEach(differences, item => {
      if (get(item, 'kind') === 'A' && get(item, 'item.rhs')) {
        set(
          dataUpdate,
          `${get(item, `path`, []).join('.')}.${get(item, 'index')}`,
          get(item, 'item.rhs'),
        );
      } else {
        set(
          dataUpdate,
          `${get(item, 'path', [])?.join('.')}`,
          get(item, 'rhs'),
        );
      }
    });

    return dataUpdate;
  };

  const validateUpdateCurriculumVitae = () => {
    const { infoPersonal } = dataWillUpdate;
    const validation = new Validation({
      ...(has(infoPersonal, 'phoneNumber') && {
        phoneNumber: [
          { key: 'required', message: 'Vui lòng nhập Số điện thoại.' },
          { key: 'phoneNumber', message: 'Số điện thoại không hợp lệ.' },
        ],
      }),
      ...(has(infoPersonal, 'email') && {
        email: [
          { key: 'required', message: 'Vui lòng nhập email.' },
          { key: 'email', message: 'Email không hợp lệ.' },
        ],
      }),
      ...(has(infoPersonal, 'fullName') && {
        fullName: [{ key: 'required', message: 'Vui lòng nhập Họ và tên.' }],
      }),
      ...(has(infoPersonal, 'identification') && {
        identification: [
          { key: 'required', message: 'Vui lòng nhập CCCD.' },
          { key: 'identification', message: 'Số CCCD không hợp lệ.' },
        ],
      }),
    });

    return validation.validate({
      phoneNumber: infoPersonal?.phoneNumber,
      email: infoPersonal?.email,
      fullName: infoPersonal?.fullName,
      identification: infoPersonal?.identification,
    });
  };

  const validateUpdateContract = () => {
    const { infoContract } = dataWillUpdate;
    const validation = new Validation({
      // ...(has(infoContract, 'contractCode') && {
      //   phoneNumber: [
      //     { key: 'required', message: 'Vui lòng nhập mã hợp đồng.' },
      //   ],
      // }),
      ...(has(infoContract, 'contractType') && {
        email: [{ key: 'required', message: 'Vui lòng chọn loại hợp đồng.' }],
      }),
    });
    return validation.validate({
      contractCode: infoContract?.contractCode,
      contractType: infoContract?.contractType,
    });
  };

  const validateUpdateHealth = () => {
    const { infoHealth } = dataWillUpdate;
    const validation = new Validation({
      ...(has(infoHealth, 'note') && {
        note: [{ key: 'required', message: 'Vui lòng nhập lưu ý y tế.' }],
      }),
    });
    return validation.validate({
      note: infoHealth?.note,
    });
  };

  const validate = (step: number | number[]) => {
    let isValid = false;
    const validation = [
      validateUpdateCurriculumVitae,
      validateUpdateContract,
      validateUpdateHealth,
    ];
    if (isArray(step)) {
      isValid = every(step, s => {
        const result = validation[s - 1]();
        isValid = result.isValid;
        if (!isValid) {
          const beforeErrors = errors || {};
          setErrors({
            ...beforeErrors,
            ...result.errors,
          });
        }
        return isValid;
      });

      if (isValid) {
        setErrors(undefined);
      }
      return isValid;
    }

    const result = validation[step - 1]();

    isValid = result.isValid;
    if (isValid) {
      setErrors(undefined);
    } else {
      setErrors(result.errors);
    }

    return isValid;
  };

  const handleNextStep = () => {
    setCurrentStep(prevState => prevState + 1);
  };

  const handleSubmitUpdateProfileData = () => {
    const isValid = validate([currentStep]);
    const {
      infoPersonal,
      workingHistory,
      infoContract,
      infoSalary,
      infoInsurance,
      workingProcess,
      historyResolveInsurance,
      infoHealth,
    } = dataWillUpdate;
    if (isValid) {
      switch (currentStep) {
        case CURRICULUM_VITAE_SCREEN:
          updateCurriculumVitae({
            infoPersonal: { ...infoPersonal, id: employeeDetailState.id },
            workingHistory: map(workingHistory, (item, idx) => ({
              ...item,
              id: get(
                employeeDetailState,
                `workingHistories.${idx}.id`,
                undefined,
              ),
            })),
          });
          break;
        case CONTRACT_SCREEN:
          fetchUpdateContract({
            infoSalary: {
              ...infoSalary,
              allowances: chain(infoSalary?.allowances)
                .map((item, idx) => ({
                  ...item,
                  id: get(
                    contractDetailState,
                    `infoSalary.allowances.${idx}.id`,
                    undefined,
                  ),
                }))
                .filter(item => !(!item?.id && !item.allowance))
                .value(),
            },
            infoContract: {
              ...infoContract,
              id: get(contractDetailState, 'infoContract.id'),
            },
            infoInsurance: {
              ...infoInsurance,
              id: get(contractDetailState, 'infoInsurance.id'),
            },
            workingProcess: map(workingProcess, (item, idx) => ({
              ...item,
              id: get(
                contractDetailState,
                `infoWorkingProcess.${idx}.id`,
                undefined,
              ),
            })),
            historyResolveInsurance: map(
              historyResolveInsurance,
              (item, idx) => ({
                ...item,
                id: get(
                  contractDetailState,
                  `infoInsuranceProcessedHistories.${idx}.id`,
                  undefined,
                ),
              }),
            ),
          });
          break;
        case HEALTH_SCREEN:
          updateHealth({
            ...infoHealth,
            id: healthDetailState.id,
          });
          break;
        default:
          break;
      }
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prevState => prevState - 1);
  };

  useEffect(() => {
    if (profileData) {
      const tempDifferences = getDifference();
      if (
        tempDifferences &&
        isArray(tempDifferences) &&
        size(tempDifferences)
      ) {
        setIsChange(true);
        setDataWillUpdate(buildDataUpdate(tempDifferences));
      } else {
        setDataWillUpdate({});
        setIsChange(false);
      }
    }
  }, [profileData]);
  const { t } = useTranslation();
  return (
    <div className="app-container">
      <div
        className="stepper stepper-links d-flex flex-column"
        id="kt_modal_create_campaign_stepper"
      >
        <div className="stepper-nav justify-content-center py-2">
          {map(steps, step => (
            <div
              className={
                currentStep === step.id
                  ? 'stepper-item me-5 me-md-15 current'
                  : 'stepper-item me-5 me-md-15'
              }
              data-kt-stepper-element="nav"
              key={step.id}
            >
              <h3
                className="stepper-title cursor-pointer"
                onClick={() => setCurrentStep(step.id)}
              >
                {step.label}
              </h3>
            </div>
          ))}
        </div>
        {employeeDetailState && (
          <div className="d-flex flex-wrap flex-sm-nowrap">
            <div className="me-7 mb-4">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <img
                  src={get(last(employeeDetailState?.faceImage), 'originalURL')}
                  alt="image"
                />
                <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px"></div>
              </div>
            </div>

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <a
                      href="#"
                      className="text-gray-900 text-hover-primary fs-2 fw-bold me-1"
                    >
                      {employeeDetailState.fullName}
                    </a>
                  </div>
                  <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-400 ts-2 text-hover-primary me-5 mb-2"
                    >
                      {t('codeRecords')}: {employeeDetailState.username}
                    </a>
                  </div>
                  <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                    <span className="badge badge-light-primary">Active</span>
                  </div>
                </div>
                <div className="d-flex my-4">
                  <div className="me-0">
                    <button
                      type="button"
                      className="btn btn-light-primary me-3"
                      onClick={() => {
                        setIsShowLogProfile(true);
                      }}
                    >
                      <i className="ki-duotone ki-time fs-2">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>{' '}
                      {t('history')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!isLoading ? renderStep() : <></>}

        <div className="d-flex flex-stack pt-10">
          <div className="me-2">
            {currentStep <= HEALTH_SCREEN ? (
              <button
                type="button"
                className="btn btn-lg btn-light-primary me-3"
                disabled={currentStep === 1 || isChange}
                onClick={handlePrevStep}
              >
                <i className="ki-outline ki-arrow-left fs-3 me-1"></i>
                {t('back')}
              </button>
            ) : (
              <></>
            )}
          </div>

          <div>
            <button
              type="button"
              className="btn btn-lg btn-success"
              onClick={handleSubmitUpdateProfileData}
              disabled={!isChange}
            >
              <span className="indicator-label">
                {t('save')}
                <i className="fa-solid fa-check fs-3 ms-2 me-0"></i>
              </span>
              <span className="indicator-progress">
                {t('pleaseWait')}...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
          </div>

          <div>
            {currentStep < HEALTH_SCREEN ? (
              <button
                type="button"
                className="btn btn-lg btn-primary"
                onClick={handleNextStep}
                disabled={isChange}
              >
                {t('next')}
                <i className="ki-outline ki-arrow-right fs-3 ms-1 me-0"></i>
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <DefaultLoading isShow={isLoading} />
    </div>
  );
};

const mapStateToProps = ({ editProfile }) => ({
  employeeDetailState: editProfile.employeeDetail,
  contractDetailState: editProfile.contractDetail,
  healthDetailState: editProfile.healthDetail,
  isLoading: editProfile.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchDirectManagers: () =>
    dispatch({
      type: `${createProfileAction.getListDirectManagersPending}_saga`,
    }),
  fetchListMasterData: () =>
    dispatch({
      type: `${createProfileAction.getMasterDataPending}_saga`,
    }),
  fetchGetListCompany: payload =>
    dispatch({
      type: `${manageCompanyActions.getListCompanyPending}_saga`,
      payload,
    }),
  fetchGetListDepartment: payload =>
    dispatch({
      type: `${manageCompanyActions.getListDepartmentPending}_saga`,
      payload,
    }),
  fetchGetEmployeeDetail: payload =>
    dispatch({
      type: `${editProfileAction.getEmployeeDetailPending}_saga`,
      payload,
    }),
  fetchGetContractDetail: payload =>
    dispatch({
      type: `${editProfileAction.getContractDetailPending}_saga`,
      payload,
    }),
  fetchGetHealthDetail: payload =>
    dispatch({
      type: `${editProfileAction.getHealthDetailPending}_saga`,
      payload,
    }),
  updateCurriculumVitae: payload =>
    dispatch({
      type: `${editProfileAction.updateCurriculumVitaePending}_saga`,
      payload,
    }),
  fetchUpdateContract: payload =>
    dispatch({
      type: `${editProfileAction.updateContractPending}_saga`,
      payload,
    }),
  updateHealth: payload =>
    dispatch({
      type: `${editProfileAction.updateHealthPending}_saga`,
      payload,
    }),
  resetEmployeeDetail: payload =>
    dispatch({
      type: `${editProfileAction.resetEmployeeDetail}_saga`,
      payload,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
