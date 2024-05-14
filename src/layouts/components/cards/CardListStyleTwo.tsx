import React from 'react';

const CardListStyleTwo = () => {
  return (
    <div className="card card-flush h-md-100">
      <div className="card-header py-7">
        <div className="m-0">
          <div className="d-flex align-items-center mb-2">
            <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2">
              0.37%
            </span>

            <span className="badge badge-light-danger fs-base">
              <i className="ki-outline ki-arrow-up fs-5 text-danger ms-n1" />
              8.02%
            </span>
          </div>

          <span className="fs-6 fw-semibold text-gray-400">
            Online store convertion rate
          </span>
        </div>

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

      <div className="card-body pt-0">
        <div className="mb-0">
          <div className="d-flex flex-stack">
            <div className="d-flex align-items-center me-5">
              <div className="symbol symbol-30px me-5">
                <span className="symbol-label">
                  <i className="ki-outline ki-magnifier fs-3 text-gray-600"></i>
                </span>
              </div>

              <div className="me-5">
                <a
                  href="#"
                  className="text-gray-800 fw-bold text-hover-primary fs-6"
                >
                  Search Retargeting
                </a>

                <span className="text-gray-400 fw-semibold fs-7 d-block text-start ps-0">
                  Direct link clicks
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <span className="text-gray-800 fw-bold fs-6 me-3">0.24%</span>

              <div className="d-flex flex-center">
                <span className="badge badge-light-success fs-base">
                  <i className="ki-outline ki-arrow-up fs-5 text-success ms-n1" />
                  2.4%
                </span>
              </div>
            </div>
          </div>

          <div className="separator separator-dashed my-3"></div>

          <div className="d-flex flex-stack">
            <div className="d-flex align-items-center me-5">
              <div className="symbol symbol-30px me-5">
                <span className="symbol-label">
                  <i className="ki-outline ki-tiktok fs-3 text-gray-600"></i>
                </span>
              </div>

              <div className="me-5">
                <a
                  href="#"
                  className="text-gray-800 fw-bold text-hover-primary fs-6"
                >
                  Social Retargeting
                </a>

                <span className="text-gray-400 fw-semibold fs-7 d-block text-start ps-0">
                  Direct link clicks
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <span className="text-gray-800 fw-bold fs-6 me-3">0.94%</span>

              <div className="d-flex flex-center">
                <span className="badge badge-light-danger fs-base">
                  <i className="ki-outline ki-arrow-down fs-5 text-danger ms-n1" />
                  9.4%
                </span>
              </div>
            </div>
          </div>

          <div className="separator separator-dashed my-3"></div>

          <div className="d-flex flex-stack">
            <div className="d-flex align-items-center me-5">
              <div className="symbol symbol-30px me-5">
                <span className="symbol-label">
                  <i className="ki-outline ki-sms fs-3 text-gray-600" />
                </span>
              </div>

              <div className="me-5">
                <a
                  href="#"
                  className="text-gray-800 fw-bold text-hover-primary fs-6"
                >
                  Email Retargeting
                </a>

                <span className="text-gray-400 fw-semibold fs-7 d-block text-start ps-0">
                  Direct link clicks
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <span className="text-gray-800 fw-bold fs-6 me-3">1.23%</span>

              <div className="d-flex flex-center">
                <span className="badge badge-light-success fs-base">
                  <i className="ki-outline ki-arrow-up fs-5 text-success ms-n1" />
                  0.2%
                </span>
              </div>
            </div>
          </div>

          <div className="separator separator-dashed my-3"></div>

          <div className="d-flex flex-stack">
            <div className="d-flex align-items-center me-5">
              <div className="symbol symbol-30px me-5">
                <span className="symbol-label">
                  <i className="ki-outline ki-icon fs-3 text-gray-600" />
                </span>
              </div>

              <div className="me-5">
                <a
                  href="#"
                  className="text-gray-800 fw-bold text-hover-primary fs-6"
                >
                  Referrals Customers
                </a>

                <span className="text-gray-400 fw-semibold fs-7 d-block text-start ps-0">
                  Direct link clicks
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <span className="text-gray-800 fw-bold fs-6 me-3">0.08%</span>

              <div className="d-flex flex-center">
                <span className="badge badge-light-danger fs-base">
                  <i className="ki-outline ki-arrow-down fs-5 text-danger ms-n1" />
                  0.4%
                </span>
              </div>
            </div>
          </div>

          <div className="separator separator-dashed my-3"></div>

          <div className="d-flex flex-stack">
            <div className="d-flex align-items-center me-5">
              <div className="symbol symbol-30px me-5">/</div>

              <div className="me-5">
                <a
                  href="#"
                  className="text-gray-800 fw-bold text-hover-primary fs-6"
                >
                  Other
                </a>

                <span className="text-gray-400 fw-semibold fs-7 d-block text-start ps-0">
                  Direct link clicks
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <span className="text-gray-800 fw-bold fs-6 me-3">0.46%</span>

              <div className="d-flex flex-center">
                <span className="badge badge-light-success fs-base">
                  <i className="ki-outline ki-arrow-up fs-5 text-success ms-n1" />
                  8.3%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardListStyleTwo;
