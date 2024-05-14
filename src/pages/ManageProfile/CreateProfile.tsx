import React, { useEffect, useState } from 'react';
import CreateHealth from '../../layouts/components/profiles/CreateHealth';
import CreateCurriculumVitae from '../../layouts/components/profiles/CreateCurriculumVitae';
import CreateContract from '../../layouts/components/profiles/CreateContract';
import { every, forIn, isArray, isEmpty, map } from 'lodash';
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
import PageTitle from '../../layouts/commons/pageTilte/PageTitle';
import { Link } from 'react-router-dom';
import { IPageTitle } from '../../stores/types';
import { toast } from 'react-toastify';
import { BLOOD_GROUP } from '../../constants/patternValidate.constant';
import { translate } from '../../translates/translate';

const CURRICULUM_VITAE_SCREEN = 1;
const CONTRACT_SCREEN = 2;
const HEALTH_SCREEN = 3;
const SUCCESSFULLY_SCREEN = 4;

const steps = [
  { id: CURRICULUM_VITAE_SCREEN, label: translate('curriculumVitae') },
  { id: CONTRACT_SCREEN, label: translate('contract') },
  { id: HEALTH_SCREEN, label: translate('health') },
  { id: SUCCESSFULLY_SCREEN, label: translate('completed') },
];

enum ScreenErrorMapKey {
  curriculum_vitae = CURRICULUM_VITAE_SCREEN,
  contract = CONTRACT_SCREEN,
  health = HEALTH_SCREEN,
}

enum FieldErrorMapKey {
  phone_number = 'phoneNumber',
  identification = 'identification',
  email = 'email',
}

const pageTitle: IPageTitle = {
  label: translate('createdElectronicRecord'),
  links: [
    {
      name: translate('home'),
      path: '/',
    },
    {
      name: translate('electronicRecord'),
      path: '/manage_profile',
    },
  ],
};

const CreateProfile = ({
  errorsState,
  isError,
  fetchDirectManagers,
  fetchListMasterData,
  createEmployeeProfile,
  getListCompany,
  getListDepartment,
}) => {
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
  const [errors, setErrors] = useState<{ [k: string]: string } | undefined>(
    undefined,
  );

  useEffect(() => {
    fetchDirectManagers();
    fetchListMasterData();
    getListCompany();
    getListDepartment();
  }, []);

  useEffect(() => {
    if (!isEmpty(errorsState)) {
      forIn(errorsState, (value, key) => {
        const [screen, field] = key.split('.');
        setErrors(prevState => ({
          ...prevState,
          [FieldErrorMapKey[field]]: value,
        }));
        setCurrentStep(ScreenErrorMapKey[screen]);
      });
    }

    return () => {
      setErrors({});
    };
  }, [errorsState]);

  useEffect(() => {
    if (isError) {
      toast.error('fail');
    }
  }, [isError]);

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

  const renderStep = () => {
    switch (currentStep) {
      case CURRICULUM_VITAE_SCREEN:
        return (
          <CreateCurriculumVitae
            personalData={profileData.infoPersonal}
            historiesData={profileData.workingHistory}
            onChangePersonalData={handleChangeProfileData}
            onChangeHistoriesData={handleChangeProfileData}
            errors={errors}
            isShowLogCurriculumVitae={undefined}
            setIsShowLogCurriculumVitae={undefined}
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
            errors={errors}
            isShowLogContract={undefined}
            setIsShowLogContract={undefined}
          />
        );
      case HEALTH_SCREEN:
        return (
          <CreateHealth
            infoHealthData={profileData.infoHealth}
            onChangeInfoHealth={handleChangeProfileData}
            // onChangeCurriculumVitaeData={handleChangeProfileData}
            errors={errors}
            isShowLogHealth={undefined}
            setIsShowLogHealth={undefined}
          />
        );
      case SUCCESSFULLY_SCREEN:
        return (
          <div className="w-100">
            <div className="pb-12 text-center">
              <h1 className="fw-bold text-dark">Tạo hồ sơ thành công</h1>

              <div className="fw-semibold text-muted fs-4">
                Đã tạo thành công hồ sơ điện tử cho ...
              </div>
            </div>

            <div className="d-flex flex-center pb-20">
              <button
                id="kt_modal_create_campaign_create_new"
                type="button"
                className="btn btn-lg btn-light me-3"
                data-kt-element="complete-start"
              >
                Tạo hồ sơ điện tử
              </button>
              <a
                href=""
                className="btn btn-lg btn-primary"
                data-bs-toggle="tooltip"
                title="Coming Soon"
              >
                Chi tiết hồ sơ vừa tạo
              </a>
            </div>

            <div className="text-center px-4">
              <img
                src="assets/media/illustrations/sketchy-1/9.png"
                alt=""
                className="mww-100 mh-350px"
              />
            </div>
          </div>
        );
      default:
        return <></>;
    }
  };

  const validateCreateCurriculumVitae = () => {
    const { infoPersonal, workingHistory } = profileData;
    const validation = new Validation({
      phoneNumber: [
        { key: 'required', message: 'Vui lòng nhập Số điện thoại.' },
        { key: 'phoneNumber', message: 'Số điện thoại không hợp lệ.' },
      ],
      email: [
        { key: 'required', message: 'Vui lòng nhập email.' },
        { key: 'email', message: 'Email không hợp lệ.' },
      ],
      fullName: [{ key: 'required', message: 'Vui lòng nhập Họ và tên.' }],
      identification: [
        { key: 'required', message: 'Vui lòng nhập CCCD.' },
        { key: 'identification', message: 'Số CCCD không hợp lệ.' },
      ],
      workEnd: [
        {
          key: 'startDateBeforeEndDate',
          message: 'Ngày kết thúc phải sau ngày bắt đầu',
        },
      ],
    });

    return validation.validate({
      phoneNumber: infoPersonal?.phoneNumber,
      email: infoPersonal?.email,
      fullName: infoPersonal?.fullName,
      identification: infoPersonal?.identification,
      ...(workingHistory && {
        workEnd: workingHistory.map(item => ({
          startDate: item.workStart,
          endDate: item.workEnd,
        })),
      }),
    });
  };

  const validateCreateContract = () => {
    const { infoContract, workingProcess, infoInsurance } = profileData;
    const validation = new Validation({
      // contractCode: [
      //   { key: 'required', message: 'Vui lòng nhập mã hợp đồng.' },
      // ],
      contractType: [
        { key: 'required', message: 'Vui lòng chọn loại hợp đồng.' },
      ],
      processWorkingToDate: [
        {
          key: 'startDateBeforeEndDate',
          message: 'Ngày kết thúc phải sau ngày bắt đầu',
        },
      ],
      contractFiles: [
        {
          key: 'required',
          message: 'Vui lòng tải lên hợp đồng',
        },
      ],
      contractHealthRecords: [
        {
          key: 'required',
          message: 'Vui lòng tải lên hồ sơ sức khỏe',
        },
      ],
    });
    return validation.validate({
      // contractCode: infoContract?.contractCode,
      contractType: infoContract?.contractType,
      contractFiles: infoContract?.contractFiles,
      contractHealthRecords: infoInsurance?.contractHealthRecords,
      ...(workingProcess && {
        processWorkingToDate: workingProcess.map(item => ({
          startDate: item.processWorkingFromDate,
          endDate: item.processWorkingToDate,
        })),
      }),
    });
  };

  const validateCreateHealth = () => {
    const { infoHealth } = profileData;
    const validation = new Validation({
      note: [
        { key: 'required', message: 'Vui lòng nhập lưu ý y tế.' },
        {
          key: 'max',
          message: 'Trường Ghi chú y tế không được vượt quá 255 ký tự.',
          value: '255',
        },
      ],
      bloodGroup: [
        {
          key: 'nullable',
        },
        {
          key: 'in',
          message: `Trường Nhóm máu phải thuộc trong các giá trị sau: ${BLOOD_GROUP.join(
            ',',
          )}`,
          value: BLOOD_GROUP,
        },
      ],
      healthRecords: [
        {
          key: 'required',
          message: 'Vui lòng tải lên hồ sơ sức khỏe',
        },
      ],
    });
    return validation.validate({
      note: infoHealth?.note,
      bloodGroup: infoHealth?.bloodGroup,
      healthRecords: infoHealth?.healthRecords,
    });
  };

  const validate = (step: number | number[]) => {
    let isValid = false;
    const validation = [
      validateCreateCurriculumVitae,
      validateCreateContract,
      validateCreateHealth,
    ];
    if (isArray(step)) {
      isValid = every(step, s => {
        const result = validation[s - 1]();
        isValid = result.isValid;
        if (!isValid) {
          // const beforeErrors = errors || {};
          setErrors({
            // ...beforeErrors,
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
    const isValid = validate(currentStep);

    if (isValid) {
      setCurrentStep(prevState => prevState + 1);
    }
  };

  const handleSubmitCreateProfileData = () => {
    const isValid = validate([
      CURRICULUM_VITAE_SCREEN,
      CONTRACT_SCREEN,
      HEALTH_SCREEN,
    ]);

    if (isValid) {
      createEmployeeProfile(profileData);
      setCurrentStep(prevState => prevState + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prevState => prevState - 1);
  };

  return (
    <div className="app-container">
      <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100  pt-7 pt-lg-10 pb-5 pb-lg-8">
        <PageTitle pageTitle={pageTitle} />
        <div className="d-flex align-items-center gap-2 gap-lg-3">
          <Link
            to="/manage_profile"
            className="menu-title btn btn-flex btn-sm btn-outline"
          >
            <span className="ki-outline ki-arrow-left fs-1"></span> Back
          </Link>
        </div>
      </div>
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
              <h3 className="stepper-title">{step.label}</h3>
            </div>
          ))}
        </div>

        {renderStep()}

        <div className="d-flex flex-stack position-fixed end-0 pt-10">
          <div className="me-2">
            {currentStep <= HEALTH_SCREEN ? (
              <button
                type="button"
                className="btn btn-lg btn-light-primary me-3"
                disabled={currentStep === 1}
                onClick={handlePrevStep}
              >
                <i className="ki-outline ki-arrow-left fs-3 me-1"></i>Quay lại
              </button>
            ) : (
              <></>
            )}
          </div>

          <div>
            {currentStep === HEALTH_SCREEN ? (
              <button
                type="button"
                className="btn btn-lg btn-primary"
                onClick={handleSubmitCreateProfileData}
              >
                <span className="indicator-label">
                  Tạo hồ sơ
                  <i className="ki-outline ki-arrow-right fs-3 ms-2 me-0"></i>
                </span>
                <span className="indicator-progress">
                  Vui lòng đợi...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            ) : (
              <></>
            )}
            {currentStep < HEALTH_SCREEN ? (
              <button
                type="button"
                className="btn btn-lg btn-primary"
                onClick={handleNextStep}
              >
                Tiếp theo
                <i className="ki-outline ki-arrow-right fs-3 ms-1 me-0"></i>
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ createProfile }) => ({
  errorsState: createProfile.errors,
  isError: createProfile.isError,
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
  createEmployeeProfile: payload =>
    dispatch({
      type: `${createProfileAction.createEmployeeProfilePending}_saga`,
      payload,
    }),
  getListCompany: payload =>
    dispatch({
      type: `${manageCompanyActions.getListCompanyPending.type}_saga`,
      payload,
    }),
  getListDepartment: payload =>
    dispatch({
      type: `${manageCompanyActions.getListDepartmentPending.type}_saga`,
      payload,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
