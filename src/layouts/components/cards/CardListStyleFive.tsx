import React from 'react';

const CardListStyleFive = () => {
  return (
    <div className="card card-flush h-xl-100">
      <div className="card-header pt-7">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold text-gray-800">
            Visits by Source
          </span>
          <span className="text-gray-400 mt-1 fw-semibold fs-6">
            29.4k visitors
          </span>
        </h3>

        <div className="card-toolbar">
          <button
            className="btn btn-icon btn-color-gray-400 btn-active-color-primary justify-content-end"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-overflow="true"
          >
            <i className="ki-outline ki-dots-square fs-1 text-gray-400 me-n1"></i>
          </button>

          <div
            className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px"
            data-kt-menu="true"
          >
            <div className="menu-item px-3">
              <div className="menu-content fs-6 text-dark fw-bold px-3 py-4">
                Quick Actions
              </div>
            </div>

            <div className="separator mb-3 opacity-75"></div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link px-3">
                New Ticket
              </a>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link px-3">
                New Customer
              </a>
            </div>

            <div
              className="menu-item px-3"
              data-kt-menu-trigger="hover"
              data-kt-menu-placement="right-start"
            >
              <a href="#" className="menu-link px-3">
                <span className="menu-title">New Group</span>
                <span className="menu-arrow"></span>
              </a>

              <div className="menu-sub menu-sub-dropdown w-175px py-4">
                <div className="menu-item px-3">
                  <a href="#" className="menu-link px-3">
                    Admin Group
                  </a>
                </div>

                <div className="menu-item px-3">
                  <a href="#" className="menu-link px-3">
                    Staff Group
                  </a>
                </div>

                <div className="menu-item px-3">
                  <a href="#" className="menu-link px-3">
                    Member Group
                  </a>
                </div>
              </div>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link px-3">
                New Contact
              </a>
            </div>

            <div className="separator mt-3 opacity-75"></div>

            <div className="menu-item px-3">
              <div className="menu-content px-3 py-3">
                <a className="btn btn-primary btn-sm px-4" href="#">
                  Generate Reports
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body d-flex align-items-end">
        <div className="w-100">
          <div className="d-flex align-items-center">
            <div className="symbol symbol-30px me-5">
              <span className="symbol-label">
                <i className="ki-outline ki-rocket fs-3 text-gray-600"></i>
              </span>
            </div>

            <div className="d-flex align-items-center flex-stack flex-wrap d-grid gap-1 flex-row-fluid">
              <div className="me-5">
                <a
                  href="#"
                  className="text-gray-800 fw-bold text-hover-primary fs-6"
                >
                  Direct Source
                </a>

                <span className="text-gray-400 fw-semibold fs-7 d-block text-start ps-0">
                  Direct link clicks
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="text-gray-800 fw-bold fs-4 me-3">1,067</span>

                <span className="badge badge-light-success fs-base">
                  <i className="ki-outline ki-arrow-up fs-5 text-success ms-n1"></i>
                  2.6%
                </span>
              </div>
            </div>
          </div>

          <div className="separator separator-dashed my-3"></div>

          <div className="d-flex align-items-center">
            <div className="symbol symbol-30px me-5">
              <span className="symbol-label">
                <i className="ki-outline ki-tiktok fs-3 text-gray-600"></i>
              </span>
            </div>

            <div className="d-flex align-items-center flex-stack flex-wrap d-grid gap-1 flex-row-fluid">
              <div className="me-5">
                <a
                  href="#"
                  className="text-gray-800 fw-bold text-hover-primary fs-6"
                >
                  Social Networks
                </a>

                <span className="text-gray-400 fw-semibold fs-7 d-block text-start ps-0">
                  All Social Channels
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="text-gray-800 fw-bold fs-4 me-3">24,588</span>

                <span className="badge badge-light-success fs-base">
                  <i className="ki-outline ki-arrow-up fs-5 text-success ms-n1"></i>
                  4.1%
                </span>
              </div>
            </div>
          </div>

          <div className="separator separator-dashed my-3"></div>

          <div className="d-flex align-items-center">
            <div className="symbol symbol-30px me-5">
              <span className="symbol-label">
                <i className="ki-outline ki-sms fs-3 text-gray-600"></i>
              </span>
            </div>

            <div className="d-flex align-items-center flex-stack flex-wrap d-grid gap-1 flex-row-fluid">
              <div className="me-5">
                <a
                  href="#"
                  className="text-gray-800 fw-bold text-hover-primary fs-6"
                >
                  Email Newsletter
                </a>

                <span className="text-gray-400 fw-semibold fs-7 d-block text-start ps-0">
                  Mailchimp Campaigns
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="text-gray-800 fw-bold fs-4 me-3">794</span>

                <span className="badge badge-light-success fs-base">
                  <i className="ki-outline ki-arrow-up fs-5 text-success ms-n1"></i>
                  0.2%
                </span>
              </div>
            </div>
          </div>

          <div className="separator separator-dashed my-3"></div>

          <div className="d-flex align-items-center">
            <div className="symbol symbol-30px me-5">
              <span className="symbol-label">
                <i className="ki-outline ki-icon fs-3 text-gray-600"></i>
              </span>
            </div>

            <div className="d-flex align-items-center flex-stack flex-wrap d-grid gap-1 flex-row-fluid">
              <div className="me-5">
                <a
                  href="#"
                  className="text-gray-800 fw-bold text-hover-primary fs-6"
                >
                  Referrals
                </a>

                <span className="text-gray-400 fw-semibold fs-7 d-block text-start ps-0">
                  Impact Radius visits
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="text-gray-800 fw-bold fs-4 me-3">6,578</span>

                <span className="badge badge-light-danger fs-base">
                  <i className="ki-outline ki-arrow-down fs-5 text-danger ms-n1"></i>
                  0.4%
                </span>
              </div>
            </div>
          </div>

          <div className="separator separator-dashed my-3"></div>

          <div className="d-flex align-items-center">
            <div className="symbol symbol-30px me-5">
              <span className="symbol-label">
                <i className="ki-outline ki-abstract-25 fs-3 text-gray-600"></i>
              </span>
            </div>

            <div className="d-flex align-items-center flex-stack flex-wrap d-grid gap-1 flex-row-fluid">
              <div className="me-5">
                <a
                  href="#"
                  className="text-gray-800 fw-bold text-hover-primary fs-6"
                >
                  Other
                </a>

                <span className="text-gray-400 fw-semibold fs-7 d-block text-start ps-0">
                  Many Sources
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="text-gray-800 fw-bold fs-4 me-3">79,458</span>

                <span className="badge badge-light-success fs-base">
                  <i className="ki-outline ki-arrow-up fs-5 text-success ms-n1"></i>
                  8.3%
                </span>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 d-1">
            <a
              href="../../demo38/dist/apps/ecommerce/sales/details.html"
              className="text-primary opacity-75-hover fs-6 fw-bold"
            >
              View Store Analytics
              <i className="ki-outline ki-arrow-right fs-3 text-primary"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardListStyleFive;
