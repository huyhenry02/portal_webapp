import React from 'react';

const MountainChart = () => {
  return (
    <div className="card card-flush h-md-100">
      <div className="card-header pt-7">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold text-dark">Sales Statistics</span>
          <span className="text-gray-400 pt-2 fw-semibold fs-6">
            Top Selling Products
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
            className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-100px py-4"
            data-kt-menu="true"
          >
            <div className="menu-item px-3">
              <a href="#" className="menu-link px-3">
                Remove
              </a>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link px-3">
                Mute
              </a>
            </div>

            <div className="menu-item px-3">
              <a href="#" className="menu-link px-3">
                Settings
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body pt-5">
        <div id="kt_charts_widget_13_chart" className="w-100 h-325px"></div>
      </div>
    </div>
  );
};

export default MountainChart;
