import React from 'react';
import Profile from './profile/Profile';
import { sidebarActions } from '../../stores/slices/sidebar.slice';
import { connect } from 'react-redux';
import SearchForm from '../components/search/search';

const Header = ({ changeMinimumSidebar }) => {
  const handlerIconMinimum = () => {
    changeMinimumSidebar();
  };
  return (
    <div id="kt_app_header" className="app-header">
      <div
        className="app-container container-fluid d-flex align-items-stretch flex-stack"
        id="kt_app_header_container"
      >
        <div
          className="container-fluid d-flex align-items-stretch flex-stack p-0"
          title="Show sidebar menu"
        >
          <div className="d-flex align-items-center d-block d-lg-none ms-n3">
            <div
              className="btn btn-icon btn-active-color-primary w-35px h-35px me-2"
              id="kt_app_sidebar_mobile_toggle"
              onClick={handlerIconMinimum}
            >
              <i className="ki-outline ki-abstract-14 fs-2"></i>
            </div>

            <a>
              <img
                alt="Logo"
                src="/assets/media/logos/demo38-small.svg"
                className="h-30px"
              />
            </a>
          </div>
          <SearchForm />
        </div>

        <div className="app-navbar flex-lg-grow-1" id="kt_app_header_navbar">
          <div className="app-navbar-item ms-1 ms-md-3">
            <div
              className="btn btn-icon btn-custom btn-color-gray-600 btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
              data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
              data-kt-menu-attach="parent"
              data-kt-menu-placement="bottom-end"
            >
              <i className="ki-outline ki-calendar fs-1"></i>
            </div>

            <div
              className="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px"
              data-kt-menu="true"
              id="kt_menu_notifications"
            >
              <div
                className="d-flex flex-column bgi-no-repeat rounded-top"
                style={{
                  backgroundImage: "url('assets/media/misc/menu-header-bg.jpg'",
                }}
              >
                <h3 className="text-white fw-semibold px-9 mt-10 mb-6">
                  Notifications
                  <span className="fs-8 opacity-75 ps-3">24 reports</span>
                </h3>

                <ul className="nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-semibold px-9">
                  <li className="nav-item">
                    <a
                      className="nav-link text-white opacity-75 opacity-state-100 pb-4"
                      data-bs-toggle="tab"
                      href="#kt_topbar_notifications_1"
                    >
                      Alerts
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-white opacity-75 opacity-state-100 pb-4 active"
                      data-bs-toggle="tab"
                      href="#kt_topbar_notifications_2"
                    >
                      Updates
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-white opacity-75 opacity-state-100 pb-4"
                      data-bs-toggle="tab"
                      href="#kt_topbar_notifications_3"
                    >
                      Logs
                    </a>
                  </li>
                </ul>
              </div>

              <div className="tab-content">
                <div
                  className="tab-pane fade"
                  id="kt_topbar_notifications_1"
                  role="tabpanel"
                >
                  <div className="scroll-y mh-325px my-5 px-8">
                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-35px me-4">
                          <span className="symbol-label bg-light-primary">
                            <i className="ki-outline ki-abstract-28 fs-2 text-primary"></i>
                          </span>
                        </div>

                        <div className="mb-0 me-2">
                          <a
                            href="#"
                            className="fs-6 text-gray-800 text-hover-primary fw-bold"
                          >
                            Project Alice
                          </a>
                          <div className="text-gray-400 fs-7">
                            Phase 1 development
                          </div>
                        </div>
                      </div>

                      <span className="badge badge-light fs-8">1 hr</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-35px me-4">
                          <span className="symbol-label bg-light-danger">
                            <i className="ki-outline ki-information fs-2 text-danger"></i>
                          </span>
                        </div>

                        <div className="mb-0 me-2">
                          <a
                            href="#"
                            className="fs-6 text-gray-800 text-hover-primary fw-bold"
                          >
                            HR Confidential
                          </a>
                          <div className="text-gray-400 fs-7">
                            Confidential staff documents
                          </div>
                        </div>
                      </div>

                      <span className="badge badge-light fs-8">2 hrs</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-35px me-4">
                          <span className="symbol-label bg-light-warning">
                            <i className="ki-outline ki-briefcase fs-2 text-warning"></i>
                          </span>
                        </div>

                        <div className="mb-0 me-2">
                          <a
                            href="#"
                            className="fs-6 text-gray-800 text-hover-primary fw-bold"
                          >
                            Company HR
                          </a>
                          <div className="text-gray-400 fs-7">
                            Corporeate staff profiles
                          </div>
                        </div>
                      </div>

                      <span className="badge badge-light fs-8">5 hrs</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-35px me-4">
                          <span className="symbol-label bg-light-success">
                            <i className="ki-outline ki-abstract-12 fs-2 text-success"></i>
                          </span>
                        </div>

                        <div className="mb-0 me-2">
                          <a
                            href="#"
                            className="fs-6 text-gray-800 text-hover-primary fw-bold"
                          >
                            Project Redux
                          </a>
                          <div className="text-gray-400 fs-7">
                            New frontend admin theme
                          </div>
                        </div>
                      </div>

                      <span className="badge badge-light fs-8">2 days</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-35px me-4">
                          <span className="symbol-label bg-light-primary">
                            <i className="ki-outline ki-colors-square fs-2 text-primary"></i>
                          </span>
                        </div>

                        <div className="mb-0 me-2">
                          <a
                            href="#"
                            className="fs-6 text-gray-800 text-hover-primary fw-bold"
                          >
                            Project Breafing
                          </a>
                          <div className="text-gray-400 fs-7">
                            Product launch status update
                          </div>
                        </div>
                      </div>

                      <span className="badge badge-light fs-8">21 Jan</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-35px me-4">
                          <span className="symbol-label bg-light-info">
                            <i className="ki-outline ki-picture fs-2 text-info"></i>
                          </span>
                        </div>

                        <div className="mb-0 me-2">
                          <a
                            href="#"
                            className="fs-6 text-gray-800 text-hover-primary fw-bold"
                          >
                            Banner Assets
                          </a>
                          <div className="text-gray-400 fs-7">
                            Collection of banner images
                          </div>
                        </div>
                      </div>

                      <span className="badge badge-light fs-8">21 Jan</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-35px me-4">
                          <span className="symbol-label bg-light-warning">
                            <i className="ki-outline ki-color-swatch fs-2 text-warning"></i>
                          </span>
                        </div>

                        <div className="mb-0 me-2">
                          <a
                            href="#"
                            className="fs-6 text-gray-800 text-hover-primary fw-bold"
                          >
                            Icon Assets
                          </a>
                          <div className="text-gray-400 fs-7">
                            Collection of SVG icons
                          </div>
                        </div>
                      </div>

                      <span className="badge badge-light fs-8">20 March</span>
                    </div>
                  </div>

                  <div className="py-3 text-center border-top">
                    <a
                      href="../../demo38/dist/pages/user-profile/activity.html"
                      className="btn btn-color-gray-600 btn-active-color-primary"
                    >
                      View All
                      <i className="ki-outline ki-arrow-right fs-5"></i>
                    </a>
                  </div>
                </div>

                <div
                  className="tab-pane fade show active"
                  id="kt_topbar_notifications_2"
                  role="tabpanel"
                >
                  <div className="d-flex flex-column px-9">
                    <div className="pt-10 pb-0">
                      <h3 className="text-dark text-center fw-bold">
                        Get Pro Access
                      </h3>

                      <div className="text-center text-gray-600 fw-semibold pt-1">
                        Outlines keep you honest. They stoping you from amazing
                        poorly about drive
                      </div>

                      <div className="text-center mt-5 mb-9">
                        <a
                          href="#"
                          className="btn btn-sm btn-primary px-6"
                          data-bs-toggle="modal"
                          data-bs-target="#kt_modal_upgrade_plan"
                        >
                          Upgrade
                        </a>
                      </div>
                    </div>

                    <div className="text-center px-4">
                      <img
                        className="mw-100 mh-200px"
                        alt="image"
                        src="assets/media/illustrations/sketchy-1/1.png"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="kt_topbar_notifications_3"
                  role="tabpanel"
                >
                  <div className="scroll-y mh-325px my-5 px-8">
                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center me-2">
                        <span className="w-70px badge badge-light-success me-4">
                          200 OK
                        </span>

                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fw-semibold"
                        >
                          New order
                        </a>
                      </div>

                      <span className="badge badge-light fs-8">Just now</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center me-2">
                        <span className="w-70px badge badge-light-danger me-4">
                          500 ERR
                        </span>

                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fw-semibold"
                        >
                          New customer
                        </a>
                      </div>

                      <span className="badge badge-light fs-8">2 hrs</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center me-2">
                        <span className="w-70px badge badge-light-success me-4">
                          200 OK
                        </span>

                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fw-semibold"
                        >
                          Payment process
                        </a>
                      </div>

                      <span className="badge badge-light fs-8">5 hrs</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center me-2">
                        <span className="w-70px badge badge-light-warning me-4">
                          300 WRN
                        </span>

                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fw-semibold"
                        >
                          Search query
                        </a>
                      </div>

                      <span className="badge badge-light fs-8">2 days</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center me-2">
                        <span className="w-70px badge badge-light-success me-4">
                          200 OK
                        </span>

                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fw-semibold"
                        >
                          API connection
                        </a>
                      </div>

                      <span className="badge badge-light fs-8">1 week</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center me-2">
                        <span className="w-70px badge badge-light-success me-4">
                          200 OK
                        </span>

                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fw-semibold"
                        >
                          Database restore
                        </a>
                      </div>

                      <span className="badge badge-light fs-8">Mar 5</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center me-2">
                        <span className="w-70px badge badge-light-warning me-4">
                          300 WRN
                        </span>

                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fw-semibold"
                        >
                          System update
                        </a>
                      </div>

                      <span className="badge badge-light fs-8">May 15</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center me-2">
                        <span className="w-70px badge badge-light-warning me-4">
                          300 WRN
                        </span>

                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fw-semibold"
                        >
                          Server OS update
                        </a>
                      </div>

                      <span className="badge badge-light fs-8">Apr 3</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center me-2">
                        <span className="w-70px badge badge-light-warning me-4">
                          300 WRN
                        </span>

                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fw-semibold"
                        >
                          API rollback
                        </a>
                      </div>

                      <span className="badge badge-light fs-8">Jun 30</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center me-2">
                        <span className="w-70px badge badge-light-danger me-4">
                          500 ERR
                        </span>

                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fw-semibold"
                        >
                          Refund process
                        </a>
                      </div>

                      <span className="badge badge-light fs-8">Jul 10</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center me-2">
                        <span className="w-70px badge badge-light-danger me-4">
                          500 ERR
                        </span>

                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fw-semibold"
                        >
                          Withdrawal process
                        </a>
                      </div>

                      <span className="badge badge-light fs-8">Sep 10</span>
                    </div>

                    <div className="d-flex flex-stack py-4">
                      <div className="d-flex align-items-center me-2">
                        <span className="w-70px badge badge-light-danger me-4">
                          500 ERR
                        </span>

                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fw-semibold"
                        >
                          Mail tasks
                        </a>
                      </div>

                      <span className="badge badge-light fs-8">Dec 10</span>
                    </div>
                  </div>

                  <div className="py-3 text-center border-top">
                    <a
                      href="../../demo38/dist/pages/user-profile/activity.html"
                      className="btn btn-color-gray-600 btn-active-color-primary"
                    >
                      View All
                      <i className="ki-outline ki-arrow-right fs-5"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="app-navbar-item ms-1 ms-md-3">
            <div
              className="btn btn-icon btn-custom btn-color-gray-600 btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
              data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
              data-kt-menu-attach="parent"
              data-kt-menu-placement="bottom-end"
            >
              <i className="ki-outline ki-abstract-26 fs-1"></i>
            </div>

            <div
              className="menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px"
              data-kt-menu="true"
            >
              <div
                className="d-flex flex-column flex-center bgi-no-repeat rounded-top px-9 py-10"
                style={{
                  backgroundImage:
                    "url('assets/media/misc/menu-header-bg.jpg')",
                }}
              >
                <h3 className="text-white fw-semibold mb-3">Quick Links</h3>

                <span className="badge bg-primary text-inverse-primary py-2 px-3">
                  25 pending tasks
                </span>
              </div>

              <div className="row g-0">
                <div className="col-6">
                  <a
                    href="../../demo38/dist/apps/projects/budget.html"
                    className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end border-bottom"
                  >
                    <i className="ki-outline ki-dollar fs-3x text-primary mb-2"></i>
                    <span className="fs-5 fw-semibold text-gray-800 mb-0">
                      Accounting
                    </span>
                    <span className="fs-7 text-gray-400">eCommerce</span>
                  </a>
                </div>

                <div className="col-6">
                  <a
                    href="../../demo38/dist/apps/projects/settings.html"
                    className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-bottom"
                  >
                    <i className="ki-outline ki-sms fs-3x text-primary mb-2"></i>
                    <span className="fs-5 fw-semibold text-gray-800 mb-0">
                      Administration
                    </span>
                    <span className="fs-7 text-gray-400">Console</span>
                  </a>
                </div>

                <div className="col-6">
                  <a
                    href="../../demo38/dist/apps/projects/list.html"
                    className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end"
                  >
                    <i className="ki-outline ki-abstract-41 fs-3x text-primary mb-2"></i>
                    <span className="fs-5 fw-semibold text-gray-800 mb-0">
                      Projects
                    </span>
                    <span className="fs-7 text-gray-400">Pending Tasks</span>
                  </a>
                </div>

                <div className="col-6">
                  <a
                    href="../../demo38/dist/apps/projects/users.html"
                    className="d-flex flex-column flex-center h-100 p-6 bg-hover-light"
                  >
                    <i className="ki-outline ki-briefcase fs-3x text-primary mb-2"></i>
                    <span className="fs-5 fw-semibold text-gray-800 mb-0">
                      Customers
                    </span>
                    <span className="fs-7 text-gray-400">Latest cases</span>
                  </a>
                </div>
              </div>

              <div className="py-2 text-center border-top">
                <a
                  href="../../demo38/dist/pages/user-profile/activity.html"
                  className="btn btn-color-gray-600 btn-active-color-primary"
                >
                  View All
                  <i className="ki-outline ki-arrow-right fs-5"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="app-navbar-item ms-1 ms-md-3">
            <div
              className="btn btn-icon btn-custom btn-color-gray-600 btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative"
              id="kt_drawer_chat_toggle"
            >
              <i className="ki-outline ki-notification-on fs-1"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge badge-circle badge-danger w-15px h-15px ms-n4 mt-3">
                5
              </span>
            </div>
          </div>

          <Profile />
        </div>
        <div className="app-navbar-separator separator d-none d-lg-flex"></div>
      </div>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  changeMinimumSidebar: () =>
    dispatch({
      type: `${sidebarActions.changeMinimumSidebar.type}_saga`,
    }),
});

export default connect(null, mapDispatchToProps)(Header);
