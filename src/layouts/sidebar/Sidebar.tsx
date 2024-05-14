import React from 'react';
import SubMenuItem from '../components/sidebar-items/SubMenuItem';
import { sidebarActions } from '../../stores/slices/sidebar.slice';
import { connect } from 'react-redux';
import './Sidabar.css';

const Sidebar = ({ changeMinimumSidebar, minimumState }) => {
  const handlerIconMinimum = event => {
    const parentElement = event.currentTarget.parentNode;
    parentElement.classList.contains('active')
      ? parentElement.classList.remove('active')
      : parentElement.classList.add('active');
    changeMinimumSidebar();
  };
  return (
    <div
      id="kt_app_sidebar"
      // className="app-sidebar flex-column "
      className={
        minimumState
          ? 'app-sidebar flex-column'
          : 'app-sidebar flex-column drawer drawer-start drawer-on'
      }
      data-kt-drawer="true"
      data-kt-drawer-name="app-sidebar"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="250px"
      data-kt-drawer-direction="start"
      data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
    >
      <div
        className="app-sidebar-header d-flex flex-stack d-none d-lg-flex pt-8 pb-2"
        id="kt_app_sidebar_header"
      >
        <a className="app-sidebar-logo">
          <img
            alt="Logo"
            src="/assets/media/logos/demo38.svg"
            className="h-25px d-none d-sm-inline app-sidebar-logo-default theme-light-show"
          />
          <img
            alt="Logo"
            src="/assets/media/logos/demo38-dark.svg"
            className="h-20px h-lg-25px theme-dark-show"
          />
        </a>

        <div
          id="kt_app_sidebar_toggle"
          className="app-sidebar-toggle btn btn-sm btn-icon bg-light btn-color-gray-700 btn-active-color-primary d-none d-lg-flex rotate"
          data-kt-toggle="true"
          data-kt-toggle-state="active"
          data-kt-toggle-target="body"
          data-kt-toggle-name="app-sidebar-minimize"
        >
          <i
            className="ki-outline ki-text-align-right rotate-180 fs-1"
            onClick={event => handlerIconMinimum(event)}
          ></i>
        </div>
      </div>

      <div
        className="app-sidebar-navs flex-column-fluid py-6"
        id="kt_app_sidebar_navs"
      >
        <div
          id="kt_app_sidebar_navs_wrappers"
          className="app-sidebar-wrapper hover-scroll-y my-2"
          data-kt-scroll="true"
          data-kt-scroll-activate="true"
          data-kt-scroll-height="auto"
          data-kt-scroll-dependencies="#kt_app_sidebar_header"
          data-kt-scroll-wrappers="#kt_app_sidebar_navs"
          data-kt-scroll-offset="5px"
        >
          <div
            id="#kt_app_sidebar_menu"
            data-kt-menu="true"
            data-kt-menu-expand="false"
            className="app-sidebar-menu-primary menu menu-column menu-rounded menu-sub-indention menu-state-bullet-primary"
          >
            <div className="menu-item mb-2">
              <div className="menu-heading text-uppercase fs-7 fw-bold">
                Menu
              </div>

              <div className="app-sidebar-separator separator"></div>
            </div>

            {/*<MenuItem />*/}

            <SubMenuItem />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ sidebar }) => ({
  minimumState: sidebar.minimum,
});
const mapDispatchToProps = dispatch => ({
  changeMinimumSidebar: () =>
    dispatch({
      type: `${sidebarActions.changeMinimumSidebar.type}_saga`,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
