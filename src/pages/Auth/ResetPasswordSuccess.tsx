import React from 'react';
import { Link } from 'react-router-dom';
const ResetPasswordSuccess = () => {
  return (
    <div
      className="d-flex flex-column flex-root custom-auth-wrap custom-auth-wrap"
      id="kt_app_root"
    >
      <div className="d-flex flex-column flex-center flex-column-fluid">
        <div className="d-flex flex-column flex-center text-center p-10">
          <div className="card card-flush w-lg-650px py-5">
            <div className="card-body py-15 py-lg-20">
              <div className="mb-14">
                <a href="#" className="">
                  <img
                    alt="Logo"
                    src="/assets/media/logos/default.svg"
                    className="h-40px"
                  />
                </a>
              </div>
              <h1 className="fw-bolder text-gray-900 mb-5">
                Password is changed
              </h1>
              <div className="fs-6 fw-semibold text-gray-500 mb-10">
                This is your opportunity to get creative
                <a href="#" className="link-primary fw-semibold">
                  max@keenthemes.com
                </a>
                <br />
                that gives readers an idea
              </div>
              <div className="mb-11">
                <Link
                  to={{
                    pathname: `/login`,
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPasswordSuccess;
