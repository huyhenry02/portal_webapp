import React from 'react';
import Cover from '../components/cover/Cover';

function BlankLayout({ children }) {
  const defaultThemeMode = 'light';
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
  return (
    <div id="kt_body" className="app-blank">
      <div className="d-flex flex-column flex-root" id="kt_app_root">
        <div className="d-flex flex-column flex-lg-row flex-column-fluid">
          {children}

          <Cover />
        </div>
      </div>
    </div>
  );
}

export default BlankLayout;
