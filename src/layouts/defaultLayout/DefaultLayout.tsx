import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../header';
import Sidebar from '../sidebar';
import InviteFriendModal from '../components/modals/InviteFriendModal';
import UserSearchModal from '../components/modals/UserSearchModal';
import ViewUserModal from '../components/modals/ViewUserModal';
import UpgradePlanModal from '../components/modals/UpgradePlanModal';
import ActivityDrawer from '../components/drawers/ActivityDrawer';
import ChatDrawer from '../components/drawers/ChatDrawer';
import CartDrawer from '../components/drawers/CartDrawer';
import Footer from '../footer/Footer';
import './DefaultLayout.css';
import { sidebarActions } from '../../stores/slices/sidebar.slice';

function DefaultLayout({
  sidebarMinimumStage,
  children,
  changeMinimumSidebar,
}) {
  const defaultThemeMode = 'light';
  const [sidebarMinimum, setSidebarMinimum] = useState(false);
  let themeMode;
  if (document.documentElement) {
    if (document.documentElement.hasAttribute('data-bs-theme-mode')) {
      themeMode = document.documentElement.getAttribute('data-bs-theme-mode');
    } else {
      if (localStorage.getItem('data-bs-theme') !== null) {
        themeMode = localStorage.getItem('data-bs-theme');
      } else {
        themeMode = defaultThemeMode;
      }
    }
    if (themeMode === 'system') {
      themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    document.documentElement.setAttribute('data-bs-theme', themeMode);
  }
  React.useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth > 991) {
        setSidebarMinimum(true);
      } else {
        setSidebarMinimum(false);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
  });
  return (
    <div
      id="kt_app_body"
      data-kt-app-header-fixed="true"
      data-kt-app-header-fixed-mobile="true"
      data-kt-app-sidebar-enabled="true"
      data-kt-app-sidebar-fixed="true"
      data-kt-app-sidebar-hoverable="true"
      data-kt-app-sidebar-push-header="true"
      data-kt-app-sidebar-push-toolbar="true"
      data-kt-app-sidebar-push-footer="true"
      data-kt-app-sidebar-minimize={sidebarMinimumStage ? 'on' : 'off'}
      data-kt-drawer={sidebarMinimumStage ? 'on' : 'off'}
      className="app-default"
    >
      <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
        <div
          className="app-page flex-column flex-column-fluid"
          id="kt_app_page"
        >
          <Header />
          <div
            className="app-wrapper flex-column flex-row-fluid"
            id="kt_app_wrapper"
          >
            <Sidebar />
            {sidebarMinimum ? null : (
              <div
                className={sidebarMinimumStage ? '' : 'drawer-overlay'}
                onClick={changeMinimumSidebar}
              ></div>
            )}
            <div
              className="app-main flex-column flex-row-fluid"
              id="kt_app_main"
            >
              <div className="d-flex flex-column flex-column-fluid">
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
      <ActivityDrawer />
      <ChatDrawer />
      <CartDrawer />
      <div id="kt_scrolltop" className="scrolltop" data-kt-scrolltop="true">
        <i className="ki-outline ki-arrow-up"></i>
      </div>

      <UpgradePlanModal />
      <ViewUserModal />
      <UserSearchModal />
      <InviteFriendModal />
    </div>
  );
}

const mapStateToProps = ({ sidebar }) => ({
  sidebarMinimumStage: sidebar.minimum,
});
const mapDispatchToProps = dispatch => ({
  changeMinimumSidebar: () =>
    dispatch({
      type: `${sidebarActions.changeMinimumSidebar.type}_saga`,
    }),
});
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
