import React from 'react';

const HorizontalLineChart = () => {
  return (
    <div className="card card-flush h-md-100">
      <div className="card-header flex-nowrap pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold text-dark">
            Top Selling Categories
          </span>
          <span className="text-gray-400 pt-2 fw-semibold fs-6">
            8k social visitors
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

      <div className="card-body pt-5 ps-6">
        <div id="kt_charts_widget_5" className="min-h-auto"></div>
      </div>
    </div>
  );
};

export default HorizontalLineChart;
