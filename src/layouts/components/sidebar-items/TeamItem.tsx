import React from 'react';

const TeamItem = () => {
  return (
    <div className="app-sidebar-menu-secondary menu menu-rounded menu-column mb-6">
      <div className="menu-item mb-2">
        <div className="menu-heading text-uppercase fs-7 fw-bold">Teams</div>
        <div className="app-sidebar-separator separator"></div>
      </div>

      <div className="menu-item">
        <a
          className="menu-link active"
          href="../../demo38/dist/apps/projects/project.html"
        >
          <span className="menu-icon">
            <span className="bullet bullet-dot bg-success"></span>
          </span>
          <span className="menu-title">AudioEngine</span>
        </a>
      </div>

      <div className="menu-item">
        <a
          className="menu-link"
          href="../../demo38/dist/apps/projects/activity.html"
        >
          <span className="menu-icon">
            <span className="bullet bullet-dot bg-danger"></span>
          </span>
          <span className="menu-title">Schipol Extranet</span>
        </a>
      </div>

      <div className="menu-item">
        <a
          className="menu-link"
          href="../../demo38/dist/apps/projects/files.html"
        >
          <span className="menu-icon">
            <i className="ki-outline ki-lock-2 fs-2"></i>
          </span>
          <span className="menu-title">ABN AMBRO</span>
        </a>
      </div>

      <div className="menu-item">
        <a
          className="menu-link"
          href="../../demo38/dist/apps/projects/settings.html"
        >
          <span className="menu-icon">
            <i className="ki-outline ki-lock-2 fs-2"></i>
          </span>
          <span className="menu-title">NS Mobile App</span>
        </a>
      </div>
    </div>
  );
};

export default TeamItem;
