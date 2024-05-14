import React, { useEffect, useState } from 'react';
import './Profile.css';
import { authenticateActions } from '../../../stores/slices/authenticate.slice';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { manageUserActions } from '../../../stores/slices/manageUser.slice';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import '../../../translates/translate';
const Profile = ({ postLogout, userInfo, getUserInfo }) => {
  const handleLogout = () => {
    postLogout();
  };
  const [isLoadDefault, setIsLoadDefault] = useState(false);
  useEffect(() => {
    if (!isLoadDefault) {
      getUserInfo();
    }
    setIsLoadDefault(true);
  }, []);
  const setItemThemeMode = () => {
    let themeMode = localStorage.getItem('data-bs-theme');
    if (themeMode != 'dark') {
      themeMode = 'dark';
    } else {
      themeMode = 'light';
    }
    localStorage.setItem('data-bs-theme', themeMode);
    window.location.reload();
  };
  let originalUrl = '/assets/media/avatars/no_avatar.png';
  let avatarKey = '';
  if (!isEmpty(userInfo?.avatar)) {
    avatarKey = Object.keys(userInfo?.avatar)[0];
    const img = new Image();
    img.src = userInfo?.avatar[avatarKey]?.original_url;
    img.onload = () => {
      originalUrl = userInfo?.avatar[avatarKey]?.original_url;
    };
    img.onerror = () => {};
  }

  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = lng => {
    if (lng !== currentLanguage) {
      i18n.changeLanguage(lng);
      setCurrentLanguage(lng);
      localStorage.setItem('language', lng);
      window.location.reload();
    }
  };

  return (
    <div
      className="app-navbar-item ms-1 ms-md-3"
      id="kt_header_user_menu_toggle"
    >
      <div
        className="cursor-pointer symbol symbol-circle symbol-35px symbol-md-45px show menu-dropdown"
        data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <img src={originalUrl} alt="user" />
      </div>

      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px custom-profile-dropdown"
        data-kt-menu="true"
      >
        <div className="menu-item px-3">
          <div className="menu-content d-flex align-items-center px-3">
            <div className="symbol symbol-50px me-5">
              <img alt="Logo" src={originalUrl} />
            </div>

            <div className="d-flex flex-column">
              <div className="fw-bold d-flex align-items-center fs-5">
                {userInfo?.name}
              </div>
              <a
                href="#"
                className="fw-semibold text-muted text-hover-primary fs-7"
              >
                {userInfo?.email}
              </a>
            </div>
          </div>
        </div>

        <div className="separator my-2"></div>

        <div className="menu-item px-5">
          <Link to="/manage_user" className="menu-link px-5">
            {t('myProfile')}
          </Link>
        </div>

        <div className="menu-item px-5">
          <a href="" className="menu-link px-5">
            <span className="menu-text">{t('myProject')}</span>
            <span className="menu-badge">
              <span className="badge badge-light-danger badge-circle fw-bold fs-7">
                3
              </span>
            </span>
          </a>
        </div>

        <div
          className="menu-item px-5"
          data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
          data-kt-menu-placement="left-start"
          data-kt-menu-offset="-15px, 0"
        >
          <a href="#" className="menu-link px-5">
            <span className="menu-title">My Subscription</span>
            <span className="menu-arrow"></span>
          </a>

          <div className="menu-sub menu-sub-dropdown w-175px py-4">
            <div className="menu-item px-3">
              <a href="#" className="menu-link px-5">
                Referrals
              </a>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link px-5">
                Billing
              </a>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link px-5">
                Payments
              </a>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link d-flex flex-stack px-5">
                Statements
                <span
                  className="ms-2 lh-0"
                  data-bs-toggle="tooltip"
                  title="View your statements"
                >
                  <i className="ki-outline ki-information-5 fs-5"></i>
                </span>
              </a>
            </div>

            <div className="separator my-2"></div>

            <div className="menu-item px-3">
              <div className="menu-content px-3">
                <label className="form-check form-switch form-check-custom form-check-solid">
                  <input
                    className="form-check-input w-30px h-20px"
                    type="checkbox"
                    defaultValue="1"
                    defaultChecked={true}
                    name="notifications"
                  />
                  <span className="form-check-label text-muted fs-7">
                    Notifications
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-item px-5">
          <a href="#" className="menu-link px-5">
            My Statements
          </a>
        </div>

        <div className="separator my-2"></div>

        <div
          className="menu-item px-5"
          data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
          data-kt-menu-placement="left-start"
          data-kt-menu-offset="-15px, 0"
        >
          <a href="#" className="menu-link px-5" onClick={setItemThemeMode}>
            <span className="menu-title position-relative">
              Chế độ Sáng/Tối
              <span className="ms-5 position-absolute translate-middle-y top-50 end-0">
                <i className="ki-outline ki-night-day theme-light-show fs-2"></i>
                <i className="ki-outline ki-moon theme-dark-show fs-2"></i>
              </span>
            </span>
          </a>

          <div
            className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px"
            data-kt-menu="true"
            data-kt-element="theme-mode-menu"
          >
            <div className="menu-item px-3 my-0">
              <a
                href="#"
                className="menu-link px-3 py-2"
                data-kt-element="mode"
                data-kt-value="light"
              >
                <span className="menu-icon" data-kt-element="icon">
                  <i className="ki-outline ki-night-day fs-2"></i>
                </span>
                <span className="menu-title">Sáng</span>
              </a>
            </div>

            <div className="menu-item px-3 my-0">
              <a
                href="#"
                className="menu-link px-3 py-2"
                data-kt-element="mode"
                data-kt-value="dark"
              >
                <span className="menu-icon" data-kt-element="icon">
                  <i className="ki-outline ki-moon fs-2"></i>
                </span>
                <span className="menu-title">Tối</span>
              </a>
            </div>

            <div className="menu-item px-3 my-0">
              <a
                href="#"
                className="menu-link px-3 py-2"
                data-kt-element="mode"
                data-kt-value="system"
              >
                <span className="menu-icon" data-kt-element="icon">
                  <i className="ki-outline ki-screen fs-2"></i>
                </span>
                <span className="menu-title">System</span>
              </a>
            </div>
          </div>
        </div>

        <div
          className="menu-item px-5"
          data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
          data-kt-menu-placement="left-start"
          data-kt-menu-offset="-15px, 0"
        >
          <a href="#" className="menu-link px-5">
            <span className="menu-title position-relative">
              {t('language')}
              <span
                className="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0 "
                onClick={() =>
                  changeLanguage(currentLanguage === 'en' ? 'vi' : 'en')
                }
              >
                {currentLanguage === 'en' ? t('vietnamese') : t('english')}
                <img
                  className="w-15px h-15px rounded-1 ms-2"
                  src="assets/media/flags/united-states.svg"
                  alt=""
                />
              </span>
            </span>
          </a>

          <div className="menu-sub menu-sub-dropdown w-175px py-4">
            <div className="menu-item px-3">
              <a href="#" className="menu-link d-flex px-5 active">
                <span className="symbol symbol-20px me-4">
                  <img
                    className="rounded-1"
                    src="assets/media/flags/united-states.svg"
                    alt=""
                  />
                </span>
                English
              </a>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link d-flex px-5">
                <span className="symbol symbol-20px me-4">
                  <img
                    className="rounded-1"
                    src="assets/media/flags/spain.svg"
                    alt=""
                  />
                </span>
                Spanish
              </a>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link d-flex px-5">
                <span className="symbol symbol-20px me-4">
                  <img
                    className="rounded-1"
                    src="assets/media/flags/germany.svg"
                    alt=""
                  />
                </span>
                German
              </a>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link d-flex px-5">
                <span className="symbol symbol-20px me-4">
                  <img
                    className="rounded-1"
                    src="assets/media/flags/japan.svg"
                    alt=""
                  />
                </span>
                Japanese
              </a>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link d-flex px-5">
                <span className="symbol symbol-20px me-4">
                  <img
                    className="rounded-1"
                    src="assets/media/flags/france.svg"
                    alt=""
                  />
                </span>
                French
              </a>
            </div>
          </div>
        </div>

        <div className="menu-item px-5 my-1">
          <a href="#" className="menu-link px-5">
            {t('accountSettings')}
          </a>
        </div>

        <div className="menu-item px-5">
          <a className="menu-link px-5" onClick={handleLogout}>
            {t('logout')}
          </a>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ authenticate, manageUser }) => ({
  userInfo: manageUser.userInfo,
  isLoadingUserInfo: manageUser.isLoading,
  isErrorUserInfo: manageUser.isError,
  messageUserInfo: manageUser.message,
  isLoadingAuthenticate: authenticate.isLoading,
  isErrorAuthenticate: authenticate.isError,
  messageAuthenticate: authenticate.message,
});

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: payload =>
      dispatch({
        type: `${manageUserActions.getUserInfoPending.type}_saga`,
        payload,
      }),
    postLogout: () =>
      dispatch({
        type: `${authenticateActions.postLogoutPending.type}_saga`,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
