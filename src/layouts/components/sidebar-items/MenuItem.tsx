import React from 'react';

const MenuItem = () => {
  return (
    <div
      data-kt-menu-trigger="click"
      className="menu-item here show menu-accordion"
    >
      <span className="menu-link">
        <span className="menu-icon">
          <i className="ki-outline ki-home-2 fs-2"></i>
        </span>
        <span className="menu-title">Dashboards</span>
        <span className="menu-arrow"></span>
      </span>

      <div className="menu-sub menu-sub-accordion">
        <div className="menu-item">
          <a className="menu-link active" href="../../demo38/dist/index.html">
            <span className="menu-bullet">
              <span className="bullet bullet-dot"></span>
            </span>
            <span className="menu-title">Default</span>
          </a>
        </div>

        <div
          className="menu-inner flex-column collapse"
          id="kt_app_sidebar_menu_dashboards_collapse"
        >
          <div className="menu-item">
            <a
              className="menu-link"
              href="../../demo38/dist/dashboards/bidding.html"
            >
              <span className="menu-bullet">
                <span className="bullet bullet-dot"></span>
              </span>
              <span className="menu-title">Bidding</span>
            </a>
          </div>

          <div className="menu-item">
            <a
              className="menu-link"
              href="../../demo38/dist/dashboards/pos.html"
            >
              <span className="menu-bullet">
                <span className="bullet bullet-dot"></span>
              </span>
              <span className="menu-title">POS System</span>
            </a>
          </div>
        </div>
        <div className="menu-item">
          <div className="menu-content">
            <a
              className="btn btn-flex btn-color-primary d-flex flex-stack fs-base p-0 ms-2 mb-2 toggle collapsible collapsed"
              data-bs-toggle="collapse"
              href="#kt_app_sidebar_menu_dashboards_collapse"
              data-kt-toggle-text="Show Less"
            >
              <span data-kt-toggle-text-target="true">Show 12 More</span>
              <i className="ki-outline ki-minus-square toggle-on fs-2 me-0"></i>
              <i className="ki-outline ki-plus-square toggle-off fs-2 me-0"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
