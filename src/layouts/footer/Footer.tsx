import React from 'react';

const Footer = () => {
  return (
    <div id="kt_app_footer" className="app-footer">
      <div className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted fw-semibold me-1">2023&copy;</span>
          <a
            href="https://keenthemes.com"
            target="_blank"
            className="text-gray-800 text-hover-primary"
            rel="noreferrer"
          >
            Keenthemes
          </a>
        </div>
        <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
          <li className="menu-item">
            <a
              href="https://keenthemes.com"
              target="_blank"
              className="menu-link px-2"
              rel="noreferrer"
            >
              About
            </a>
          </li>
          <li className="menu-item">
            <a
              href="https://devs.keenthemes.com"
              target="_blank"
              className="menu-link px-2"
              rel="noreferrer"
            >
              Support
            </a>
          </li>
          <li className="menu-item">
            <a
              href="https://1.envato.market/EA4JP"
              target="_blank"
              className="menu-link px-2"
              rel="noreferrer"
            >
              Purchase
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
