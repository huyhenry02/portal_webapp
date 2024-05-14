import React from 'react';

const MapsCountry = () => {
  return (
    <div className="card card-flush h-md-100">
      <div className="card-header pt-7">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold text-dark">World Sales</span>
          <span className="text-gray-400 pt-2 fw-semibold fs-6">
            Top Selling Countries
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
            className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-3"
            data-kt-menu="true"
          >
            <div className="menu-item px-3">
              <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">
                Payments
              </div>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link px-3">
                Create Invoice
              </a>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link flex-stack px-3">
                Create Payment
                <span
                  className="ms-2"
                  data-bs-toggle="tooltip"
                  title="Specify a target name for future usage and reference"
                >
                  <i className="ki-outline ki-information fs-6"></i>
                </span>
              </a>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link px-3">
                Generate Bill
              </a>
            </div>

            <div
              className="menu-item px-3"
              data-kt-menu-trigger="hover"
              data-kt-menu-placement="right-end"
            >
              <a href="#" className="menu-link px-3">
                <span className="menu-title">Subscription</span>
                <span className="menu-arrow"></span>
              </a>

              <div className="menu-sub menu-sub-dropdown w-175px py-4">
                <div className="menu-item px-3">
                  <a href="#" className="menu-link px-3">
                    Plans
                  </a>
                </div>

                <div className="menu-item px-3">
                  <a href="#" className="menu-link px-3">
                    Billing
                  </a>
                </div>

                <div className="menu-item px-3">
                  <a href="#" className="menu-link px-3">
                    Statements
                  </a>
                </div>

                <div className="separator my-2"></div>

                <div className="menu-item px-3">
                  <div className="menu-content px-3">
                    <label className="form-check form-switch form-check-custom form-check-solid">
                      <input
                        className="form-check-input w-30px h-20px"
                        type="checkbox"
                        value="1"
                        checked={true}
                        name="notifications"
                      />

                      <span className="form-check-label text-muted fs-6">
                        Recuring
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item px-3 my-1">
              <a href="#" className="menu-link px-3">
                Settings
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body d-flex flex-center">
        <div id="kt_maps_widget_1_map" className="w-100 h-350px"></div>
      </div>
    </div>
  );
};

export default MapsCountry;
