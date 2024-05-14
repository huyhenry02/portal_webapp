import React, { useEffect, useState } from 'react';
import { manageUserActions } from '../../stores/slices/manageUser.slice';
import { connect } from 'react-redux';
import ChangePasswordComponent from '../../layouts/components/user/ChangePasswordComponent';
import DefaultLoading from '../../layouts/commons/loading/DefaultLoading';
import PageTitle from '../../layouts/commons/pageTilte/PageTitle';
import { IPageTitle } from '../../stores/types';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { translate } from '../../translates/translate';

const ManageUser = ({ userInfo, getUserInfo, isLoading }) => {
  const pageTitle: IPageTitle = {
    label: translate('profile'),
    links: [
      {
        name: translate('home'),
        path: '/',
      },
    ],
  };
  const [isShowResetPassWord, setShowResetPassword] = useState(false);
  const [isLoadDefault, setIsLoadDefault] = useState(false);
  useEffect(() => {
    if (!isLoadDefault) {
      getUserInfo();
    }
    setIsLoadDefault(true);
  }, []);
  let originalUrl = '/assets/media/avatars/no_avatar.png';
  let avatarKey = '';
  if (!isEmpty(userInfo?.avatar)) {
    avatarKey = Object.keys(userInfo?.avatar)[0];
    originalUrl = userInfo?.avatar[avatarKey]?.original_url;
  }
  const { t } = useTranslation();
  return (
    <>
      <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
        <div
          id="kt_app_toolbar_container"
          className="app-container container-fluid d-flex align-items-stretch"
        >
          <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
            <PageTitle pageTitle={pageTitle} />
          </div>
        </div>
      </div>
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container container-fluid"
        >
          <div className="card mb-5 mb-xl-10">
            <div className="card-body pt-9 pb-0">
              <div className="d-flex flex-wrap flex-sm-nowrap">
                <div className="me-7 mb-4">
                  <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                    <img src={originalUrl} alt="image" />
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
                          {userInfo?.name}
                        </a>
                        <a href="#">
                          <i className="ki-outline ki-verify fs-1 text-primary"></i>
                        </a>
                      </div>
                      <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                        <a
                          href="#"
                          className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                        >
                          <i className="ki-outline ki-profile-circle fs-4 me-1"></i>
                          {userInfo?.role}
                        </a>
                        <a
                          href="#"
                          className="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                        >
                          <i className="ki-outline ki-sms fs-4"></i>
                          {userInfo?.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
            <div className="card-header cursor-pointer">
              <div className="card-title m-0">
                <h3 className="fw-bold m-0">{t('detailRecords')}</h3>
              </div>
              <button
                className="btn btn-sm btn-primary align-self-center"
                onClick={() => {
                  setShowResetPassword(true);
                }}
              >
                {t('changePassword')}
              </button>
            </div>
            <div className="card-body p-9">
              <div className="row mb-7">
                <label className="col-lg-4 fw-semibold text-muted">
                  {t('fullName')}
                </label>
                <div className="col-lg-8">
                  <span className="fw-bold fs-6 text-gray-800">
                    {userInfo?.name}
                  </span>
                </div>
              </div>
              <div className="row mb-7">
                <label className="col-lg-4 fw-semibold text-muted">
                  {t(' subsidiary')}
                </label>
                <div className="col-lg-8 fv-row">
                  <span className="fw-semibold text-gray-800 fs-6"></span>
                </div>
              </div>
              <div className="row mb-7">
                <label className="col-lg-4 fw-semibold text-muted">
                  {t('phoneNumber')}
                  <span
                    className="ms-1"
                    data-bs-toggle="tooltip"
                    title="Phone number must be active"
                  >
                    <i className="ki-outline ki-information fs-7"></i>
                  </span>
                </label>
                <div className="col-lg-8 d-flex align-items-center">
                  <span className="fw-bold fs-6 text-gray-800 me-2">
                    {userInfo?.phone_number}
                  </span>
                </div>
              </div>
              <div className="row mb-7">
                <label className="col-lg-4 fw-semibold text-muted">
                  {t('jobTitle')}
                </label>
                <div className="col-lg-8">
                  <a
                    href="#"
                    className="fw-semibold fs-6 text-gray-800 text-hover-primary"
                  >
                    {userInfo?.role}
                  </a>
                </div>
              </div>
              <div className="row mb-7">
                <label className="col-lg-4 fw-semibold text-muted">
                  {t('birthday')}
                  <span
                    className="ms-1"
                    data-bs-toggle="tooltip"
                    title="Country of origination"
                  >
                    <i className="ki-outline ki-information fs-7"></i>
                  </span>
                </label>
                <div className="col-lg-8">
                  <span className="fw-bold fs-6 text-gray-800"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ChangePasswordComponent
          show={isShowResetPassWord}
          onClose={() => setShowResetPassword(prev => !prev)}
        />
      </div>
      <DefaultLoading isShow={isLoading} />
    </>
  );
};
const mapStateToProps = ({ manageUser }) => ({
  userInfo: manageUser.userInfo,
  isLoading: manageUser.isLoading,
  isError: manageUser.isError,
  message: manageUser.message,
});

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: payload =>
      dispatch({
        type: `${manageUserActions.getUserInfoPending.type}_saga`,
        payload,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
